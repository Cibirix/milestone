import { NextRequest, NextResponse } from 'next/server'

type LeadPayload = {
  name?: string
  phone?: string
  email?: string
  service?: string
  message?: string
  website?: string
  recaptchaToken?: string
  landingPage?: string
  pageUrl?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  gclid?: string
  fbclid?: string
  startedAt?: string
}

type RecaptchaVerificationResponse = {
  success?: boolean
  score?: number
  action?: string
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin')
  if (!origin) return true

  const allowedOrigins = [
    request.nextUrl.origin,
    process.env.NEXT_PUBLIC_SITE_URL,
    'http://localhost:3000',
  ].filter(Boolean)

  return allowedOrigins.includes(origin)
}

function isSuspiciousSubmission(payload: LeadPayload) {
  if (payload.website?.trim()) return 'Bot submission detected'

  const startedAt = Number(payload.startedAt || 0)
  if (Number.isFinite(startedAt) && startedAt > 0) {
    const elapsed = Date.now() - startedAt
    if (elapsed < 1200) return 'Submission was too fast'
  }

  return null
}

async function verifyRecaptcha(token: string, remoteIp?: string | null) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey) return { ok: true as const, reason: '' }

  if (!token) {
    return { ok: false as const, reason: 'Missing reCAPTCHA token' }
  }

  try {
    const body = new URLSearchParams({
      secret: secretKey,
      response: token,
    })

    if (remoteIp) {
      body.set('remoteip', remoteIp)
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })

    if (!response.ok) {
      return { ok: false as const, reason: 'reCAPTCHA verification failed' }
    }

    const payload = (await response.json()) as RecaptchaVerificationResponse
    const minScore = Number(process.env.RECAPTCHA_MIN_SCORE || '0.5')
    const expectedAction = 'lead_submit'

    if (!payload.success) {
      return { ok: false as const, reason: 'reCAPTCHA was not successful' }
    }

    if (payload.action && payload.action !== expectedAction) {
      return { ok: false as const, reason: 'Invalid reCAPTCHA action' }
    }

    if (typeof payload.score === 'number' && Number.isFinite(minScore) && payload.score < minScore) {
      return { ok: false as const, reason: 'reCAPTCHA score too low' }
    }

    return { ok: true as const, reason: '' }
  } catch {
    return { ok: false as const, reason: 'reCAPTCHA request error' }
  }
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as LeadPayload

  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: 'Invalid origin' }, { status: 403 })
  }

  if (!payload.name || !payload.phone || !payload.email || !payload.service) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
  }

  const suspiciousReason = isSuspiciousSubmission(payload)
  if (suspiciousReason) {
    return NextResponse.json({ ok: false, error: suspiciousReason }, { status: 400 })
  }

  const remoteIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null
  const recaptchaResult = await verifyRecaptcha(payload.recaptchaToken || '', remoteIp)
  if (!recaptchaResult.ok) {
    return NextResponse.json({ ok: false, error: recaptchaResult.reason }, { status: 400 })
  }

  const leadRecord = {
    source: 'milestone-website',
    submittedAt: new Date().toISOString(),
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    service: payload.service,
    message: payload.message || '',
    landingPage: payload.landingPage || '',
    pageUrl: payload.pageUrl || '',
    referrer: payload.referrer || '',
    utm: {
      source: payload.utmSource || '',
      medium: payload.utmMedium || '',
      campaign: payload.utmCampaign || '',
      term: payload.utmTerm || '',
      content: payload.utmContent || '',
      gclid: payload.gclid || '',
      fbclid: payload.fbclid || '',
    },
  }

  const senseiCrmUrl = process.env.SENSEI_CRM_API_URL || process.env.SENSEI_CRM_URL
  const senseiCrmToken = process.env.SENSEI_CRM_API_TOKEN
  const webhookUrl = process.env.LEAD_WEBHOOK_URL

  let delivered = false
  const errors: string[] = []

  if (senseiCrmUrl && senseiCrmToken) {
    try {
      const crmResponse = await fetch(senseiCrmUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${senseiCrmToken}`,
          'x-api-key': senseiCrmToken,
        },
        body: JSON.stringify(leadRecord),
      })

      if (!crmResponse.ok) {
        const text = await crmResponse.text().catch(() => '')
        errors.push(`CRM submission failed (${crmResponse.status})${text ? `: ${text.slice(0, 180)}` : ''}`)
      } else {
        delivered = true
      }
    } catch {
      errors.push('CRM request error')
    }
  }

  if (webhookUrl) {
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadRecord),
      })

      if (!webhookResponse.ok) {
        errors.push(`Webhook submission failed (${webhookResponse.status})`)
      } else {
        delivered = true
      }
    } catch {
      errors.push('Webhook request error')
    }
  }

  if (!senseiCrmUrl && !webhookUrl) {
    console.info('Lead captured (no CRM/webhook configured):', leadRecord)
    return NextResponse.json({ ok: true })
  }

  if (!delivered) {
    return NextResponse.json(
      { ok: false, error: errors[0] || 'Lead delivery failed. Check CRM/webhook configuration.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
