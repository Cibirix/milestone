'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { FiMapPin, FiNavigation, FiTarget } from 'react-icons/fi'
import { serviceAreaRegions } from '@/data/enhancements'
import { siteInfo } from '@/data/siteData'

const ServiceAreaPanel = () => {
  const [activeRegion, setActiveRegion] = useState(serviceAreaRegions[0].slug)

  const currentRegion = useMemo(
    () => serviceAreaRegions.find((region) => region.slug === activeRegion) ?? serviceAreaRegions[0],
    [activeRegion],
  )

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(currentRegion.mapQuery)}&output=embed`

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-brand-50 text-brand-700 p-3 rounded-full">
          <FiMapPin />
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">Service Area</p>
          <h3 className="text-xl font-bold text-slate-900">{siteInfo.serviceArea}</h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {serviceAreaRegions.map((region) => (
          <button
            key={region.slug}
            type="button"
            onClick={() => setActiveRegion(region.slug)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-colors ${
              currentRegion.slug === region.slug
                ? 'bg-brand-700 text-white border-brand-700'
                : 'bg-white text-slate-700 border-slate-200 hover:border-brand-300 hover:text-brand-700'
            }`}
          >
            {region.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden border border-slate-200">
        <iframe
          title={`${currentRegion.label} coverage map`}
          src={mapSrc}
          className="w-full h-52"
          loading="lazy"
        />
      </div>

      <p className="text-slate-600 mt-4">{currentRegion.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {currentRegion.communities.map((community) => (
          <span key={community} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
            {community}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-brand-700 font-semibold">
            <FiTarget />
            Active ZIP Coverage
          </div>
          <p className="text-slate-600 mt-1">{currentRegion.zipCount}+ target ZIPs in this zone</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-brand-700 font-semibold">
            <FiNavigation />
            Response Model
          </div>
          <p className="text-slate-600 mt-1">Dispatch and scheduling from Glen Burnie operations</p>
        </div>
      </div>

      <div className="mt-5">
        <Link href="/locations" className="text-brand-700 font-semibold hover:text-brand-800 transition-colors">
          View full coverage and office details
        </Link>
      </div>
    </div>
  )
}

export default ServiceAreaPanel
