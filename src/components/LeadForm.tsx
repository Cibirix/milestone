'use client'

import { useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import { siteInfo } from '@/data/siteData'

const LeadForm = ({ variant = 'light' }: { variant?: 'light' | 'dark' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
      })
    } catch {
      setErrorMessage('Something went wrong. Please call us and we will help right away.')
    }
  }

  return (
    <div className={`rounded-2xl border ${variant === 'dark' ? 'border-white/20 bg-white text-slate-900' : 'border-slate-200 bg-white'} p-8 shadow-xl`}>
      <h3 className="font-display text-2xl font-bold text-slate-900">Get a Custom Building Quote</h3>
      <p className="mt-2 text-slate-600">Tell us what you are planning and our team will follow up quickly.</p>

      {isSubmitted ? (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <FiCheck className="mx-auto text-3xl text-emerald-600" />
          <p className="mt-3 font-semibold text-emerald-800">Thank you. We will contact you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {errorMessage && (
            <div className="rounded-lg border border-rust-200 bg-rust-50 px-4 py-3 text-sm text-rust-700">
              {errorMessage}
            </div>
          )}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:border-brand-400 focus:outline-none"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:border-brand-400 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:border-brand-400 focus:outline-none"
          />
          <div className="relative">
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3 pr-10 focus:border-brand-400 focus:outline-none ${formData.service ? 'text-slate-800' : 'text-slate-400'}`}
              required
            >
              <option value="" disabled>Select Building Type</option>
              <option value="Garage">Garage</option>
              <option value="Workshop">Workshop</option>
              <option value="Storage Building">Storage Building</option>
              <option value="Agricultural Structure">Agricultural Structure</option>
              <option value="Commercial Building">Commercial Building</option>
              <option value="Other / Custom">Other / Custom</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">v</span>
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about dimensions, location, timeline, and features"
            rows={4}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:border-brand-400 focus:outline-none"
          />
          <button type="submit" className="btn-primary w-full">Request My Quote</button>
        </form>
      )}

      <p className="mt-4 text-xs text-slate-500">For immediate assistance, call {siteInfo.phone}.</p>
    </div>
  )
}

export default LeadForm
