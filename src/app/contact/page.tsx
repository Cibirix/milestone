import { Metadata } from 'next'
import LeadForm from '@/components/LeadForm'
import { siteInfo } from '@/data/siteData'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Milestone Steel Structures for custom metal building quotes.',
}

const ContactPage = () => (
  <>
    <section className="bg-brand-900 py-14 text-white">
      <div className="container-custom">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-tan-200">Contact</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Start your custom building quote</h1>
        <p className="mt-4 max-w-3xl text-slate-200">Share your project details and our team will guide you through your options, timelines, and configuration choices.</p>
      </div>
    </section>

    <section className="bg-white py-14">
      <div className="container-custom grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="font-display text-2xl text-charcoal-900">Milestone Steel Structures</h2>
          <div className="mt-4 space-y-3 text-charcoal-700">
            <p><span className="font-semibold">Phone:</span> <a href={`tel:${siteInfo.phoneDigits}`}>{siteInfo.phone}</a></p>
            <p><span className="font-semibold">Email:</span> <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a></p>
            <p><span className="font-semibold">Address:</span> {siteInfo.address}</p>
            <p><span className="font-semibold">Hours:</span> {siteInfo.hours}</p>
            <p><span className="font-semibold">Facebook:</span> <a href={siteInfo.social.facebook} target="_blank" rel="noreferrer">Visit Page</a></p>
          </div>

          <div className="mt-6 rounded-xl border border-tan-200 bg-tan-50 p-4 text-sm text-charcoal-700">
            Warranty and insulation options vary by manufacturer. We will help you compare details during your quote consultation.
          </div>
        </div>

        <LeadForm />
      </div>
    </section>
  </>
)

export default ContactPage
