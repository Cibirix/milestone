'use client'

import { useEffect, useMemo, useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import { siteInfo } from '@/data/siteData'

type LeadFormData = {
  name: string
  phone: string
  email: string
  service: string
  message: string
  website: string
  landingPage: string
  pageUrl: string
  referrer: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmTerm: string
  utmContent: string
  gclid: string
  fbclid: string
  startedAt: string
}

const UTM_STORAGE_KEY = 'sensei-lead-attribution'

function getInitialFormData(): LeadFormData {
  return {
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    website: '',
    landingPage: '',
    pageUrl: '',
    referrer: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmTerm: '',
    utmContent: '',
    gclid: '',
    fbclid: '',
    startedAt: String(Date.now()),
  }
}

const LeadForm = ({
  variant = 'light',
  phone = siteInfo.phone,
}: {
  variant?: 'light' | 'dark'
  phone?: string
}) => {
  const [formData, setFormData] = useState<LeadFormData>(getInitialFormData)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const selectOptions = useMemo(
    () => ['Garage', 'Workshop', 'Storage Building', 'Agricultural Structure', 'Commercial Building', 'Other / Custom'],
    [],
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const storedRaw = window.localStorage.getItem(UTM_STORAGE_KEY)
    const stored = storedRaw ? JSON.parse(storedRaw) as Partial<LeadFormData> : {}

    const attribution = {
      utmSource: params.get('utm_source') || stored.utmSource || '',
      utmMedium: params.get('utm_medium') || stored.utmMedium || '',
      utmCampaign: params.get('utm_campaign') || stored.utmCampaign || '',
      utmTerm: params.get('utm_term') || stored.utmTerm || '',
      utmContent: params.get('utm_content') || stored.utmContent || '',
      gclid: params.get('gclid') || stored.gclid || '',
      fbclid: params.get('fbclid') || stored.fbclid || '',
    }

    window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(attribution))

    setFormData((prev) => ({
      ...prev,
      ...attribution,
      landingPage: prev.landingPage || window.location.href,
      pageUrl: window.location.href,
      referrer: document.referrer || '',
    }))
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(false)
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setIsSubmitted(true)
      setFormData((prev) => ({
        ...getInitialFormData(),
        landingPage: prev.landingPage,
        pageUrl: typeof window !== 'undefined' ? window.location.href : prev.pageUrl,
        referrer: prev.referrer,
        utmSource: prev.utmSource,
        utmMedium: prev.utmMedium,
        utmCampaign: prev.utmCampaign,
        utmTerm: prev.utmTerm,
        utmContent: prev.utmContent,
        gclid: prev.gclid,
        fbclid: prev.fbclid,
      }))
    } catch {
      setErrorMessage('Something went wrong. Please call us and we will help right away.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`${variant === 'dark' ? 'border-white/15 bg-white/[0.97] text-slate-900' : 'border-slate-200 bg-white/95 text-slate-900'} panel-card p-5 sm:p-6`}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Quick Quote Form</p>
      <h3 className="mt-3 font-display text-[1.8rem] font-bold leading-tight text-slate-900">Get a Custom Building Quote</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">Tell us what you are planning and our team will follow up with guidance on sizing, options, and next steps.</p>

      {isSubmitted ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center shadow-inner">
          <FiCheck className="mx-auto text-3xl text-emerald-600" />
          <p className="mt-3 font-semibold text-emerald-800">Thank you. We will contact you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {errorMessage && (
            <div className="rounded-lg border border-rust-200 bg-rust-50 px-4 py-3 text-sm text-rust-700">
              {errorMessage}
            </div>
          )}
          <input type="hidden" name="landingPage" value={formData.landingPage} />
          <input type="hidden" name="pageUrl" value={formData.pageUrl} />
          <input type="hidden" name="referrer" value={formData.referrer} />
          <input type="hidden" name="utmSource" value={formData.utmSource} />
          <input type="hidden" name="utmMedium" value={formData.utmMedium} />
          <input type="hidden" name="utmCampaign" value={formData.utmCampaign} />
          <input type="hidden" name="utmTerm" value={formData.utmTerm} />
          <input type="hidden" name="utmContent" value={formData.utmContent} />
          <input type="hidden" name="gclid" value={formData.gclid} />
          <input type="hidden" name="fbclid" value={formData.fbclid} />
          <input type="hidden" name="startedAt" value={formData.startedAt} />
          <div className="hidden" aria-hidden="true">
            <label>
              Website
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 focus:bg-white"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 focus:bg-white"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 focus:bg-white"
          />
          <div className="relative">
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 pr-10 outline-none transition focus:border-brand-400 focus:bg-white ${formData.service ? 'text-slate-800' : 'text-slate-400'}`}
              required
            >
              <option value="" disabled>Select Building Type</option>
              {selectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">v</span>
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about dimensions, location, timeline, and features"
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 focus:bg-white"
          />
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70">
            {isSubmitting ? 'Submitting...' : 'Request My Quote'}
          </button>
        </form>
      )}

      <p className="mt-4 text-xs text-slate-500">For immediate assistance, call {phone}. Our team can review sizing, features, and next steps by phone.</p>
    </div>
  )
}

export default LeadForm
