import { NextRequest, NextResponse } from 'next/server'

type LeadPayload = {
  name?: string
  phone?: string
  email?: string
  service?: string
  message?: string
  website?: string
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

  const senseiCrmUrl = process.env.SENSEI_CRM_API_URL
  const senseiCrmToken = process.env.SENSEI_CRM_API_TOKEN
  const webhookUrl = process.env.LEAD_WEBHOOK_URL

  if (senseiCrmUrl && senseiCrmToken) {
    try {
      const crmResponse = await fetch(senseiCrmUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${senseiCrmToken}`,
        },
        body: JSON.stringify(leadRecord),
      })

      if (!crmResponse.ok) {
        return NextResponse.json({ ok: false, error: 'CRM submission failed' }, { status: 502 })
      }
    } catch {
      return NextResponse.json({ ok: false, error: 'CRM request error' }, { status: 502 })
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
        return NextResponse.json({ ok: false, error: 'Webhook submission failed' }, { status: 502 })
      }
    } catch {
      return NextResponse.json({ ok: false, error: 'Webhook request error' }, { status: 502 })
    }
  }

  if (!senseiCrmUrl && !webhookUrl) {
    console.info('Lead captured (no CRM/webhook configured):', leadRecord)
  }

  return NextResponse.json({ ok: true })
}
