import { NextRequest, NextResponse } from 'next/server'

type LeadPayload = {
  name?: string
  phone?: string
  email?: string
  service?: string
  message?: string
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as LeadPayload

  if (!payload.name || !payload.phone || !payload.email || !payload.service) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL

  if (webhookUrl) {
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'milestone-website',
          submittedAt: new Date().toISOString(),
          ...payload,
        }),
      })

      if (!webhookResponse.ok) {
        return NextResponse.json({ ok: false, error: 'Webhook submission failed' }, { status: 502 })
      }
    } catch {
      return NextResponse.json({ ok: false, error: 'Webhook request error' }, { status: 502 })
    }
  } else {
    console.info('Lead captured (no webhook configured):', payload)
  }

  return NextResponse.json({ ok: true })
}
