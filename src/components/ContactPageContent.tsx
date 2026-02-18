import { FiAlertTriangle, FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import LeadForm from '@/components/LeadForm'
import ServiceAreaPanel from '@/components/ServiceAreaPanel'
import { siteInfo } from '@/data/siteData'

interface ContactPageContentProps {
  title: string
  subtitle: string
}

const ContactPageContent = ({ title, subtitle }: ContactPageContentProps) => {
  const mapSrc = 'https://www.google.com/maps?q=7442%20Baltimore%20Annapolis%20Blvd%20Suite%20201%20Glen%20Burnie%20MD%2021061&output=embed'

  return (
    <>
      <section className="bg-slate-900 text-white py-16">
        <div className="container-custom">
          <p className="text-sm font-semibold text-brand-300 uppercase tracking-widest">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-4">{title}</h1>
          <p className="text-lg text-slate-200 mt-4 max-w-2xl">{subtitle}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <FiPhone className="text-brand-600 text-2xl" />
                  <p className="text-slate-500 text-sm mt-3">Phone</p>
                  <a href={`tel:${siteInfo.phoneDigits}`} className="text-lg font-semibold text-slate-900">
                    {siteInfo.phone}
                  </a>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <FiMail className="text-brand-600 text-2xl" />
                  <p className="text-slate-500 text-sm mt-3">Email</p>
                  <a href={`mailto:${siteInfo.email}`} className="text-lg font-semibold text-slate-900">
                    {siteInfo.email}
                  </a>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <FiMapPin className="text-brand-600 text-2xl" />
                  <p className="text-slate-500 text-sm mt-3">Office</p>
                  <p className="text-slate-900 font-semibold">{siteInfo.address}</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <FiClock className="text-brand-600 text-2xl" />
                  <p className="text-slate-500 text-sm mt-3">Hours</p>
                  <p className="text-slate-900 font-semibold">{siteInfo.hours}</p>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-start gap-3 bg-emergency-50 border border-emergency-200 rounded-2xl p-6">
                  <FiAlertTriangle className="text-emergency-600 text-xl mt-1" />
                  <div>
                    <p className="font-semibold text-slate-900">Emergency? We respond 24/7.</p>
                    <p className="text-slate-600">Call now and we will dispatch a crew for immediate stabilization.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200">
                <iframe
                  title="House Transformers Inc. Location"
                  src={mapSrc}
                  className="w-full h-72"
                  loading="lazy"
                />
              </div>
            </div>

            <div>
              <LeadForm />
              <div className="mt-8">
                <ServiceAreaPanel />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPageContent
