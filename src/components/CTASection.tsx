import Link from 'next/link'
import { FiPhone } from 'react-icons/fi'
import { siteInfo } from '@/data/siteData'

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Get a free estimate and talk with a project specialist today.
            </h2>
            <p className="text-slate-200 text-lg">
              From roofing and remodeling to emergency restoration, we provide clear pricing, fast scheduling, and licensed workmanship across Glen Burnie and Anne Arundel County.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
            <a href={`tel:${siteInfo.phoneDigits}`} className="btn-primary">
              <FiPhone className="mr-2" /> Call Now: {siteInfo.phone}
            </a>
            <Link href="/contact" className="btn-secondary bg-white">
              Book Free Estimate
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
