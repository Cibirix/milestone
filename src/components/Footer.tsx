import Link from 'next/link'
import Image from 'next/image'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'

type FooterProps = {
  siteInfo: {
    name: string
    email: string
    phone: string
    phoneDigits: string
    address: string
    hours: string
    serviceArea?: string
    footerSummary?: string
    social: {
      facebook: string
      instagram: string
      linkedin: string
      youtube: string
    }
  }
}

const Footer = ({ siteInfo }: FooterProps) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal-950 text-slate-200">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          <div>
            <Image
              src="/brand/milestone-logo-transparent.png"
              alt="Milestone Structures"
              width={230}
              height={230}
              className="h-16 w-auto object-contain"
            />
            <p className="mt-4 text-sm text-slate-400">
              {siteInfo.footerSummary || 'Veteran-owned and operated metal building dealer focused on custom structures, transparent service, and dependable delivery.'}
            </p>
            <div className="mt-4 flex items-center gap-3 text-slate-400">
              <a href={siteInfo.social.facebook} aria-label="Facebook" className="transition hover:text-white"><FaFacebookF /></a>
              <a href={siteInfo.social.instagram} aria-label="Instagram" className="transition hover:text-white"><FaInstagram /></a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white">Quick Links</h4>
            <div className="mt-4 grid gap-2 text-sm text-slate-400">
              <Link href="/" className="transition hover:text-white">Home</Link>
              <Link href="/products" className="transition hover:text-white">Products</Link>
              <Link href="/gallery" className="transition hover:text-white">Gallery</Link>
              <Link href="/about" className="transition hover:text-white">About</Link>
              <Link href="/contact" className="transition hover:text-white">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white">Coverage Area</h4>
            <p className="mt-4 text-sm text-slate-400">{siteInfo.serviceArea}</p>
          </div>

          <div>
            <h4 className="font-semibold text-white">Contact</h4>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <p className="flex gap-3"><FiPhone className="mt-0.5 text-brand-300" /><a href={`tel:${siteInfo.phoneDigits}`}>{siteInfo.phone}</a></p>
              <p className="flex gap-3"><FiMail className="mt-0.5 text-brand-300" /><a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a></p>
              <p className="flex gap-3"><FiMapPin className="mt-0.5 text-brand-300" /><span>{siteInfo.address}</span></p>
              <p className="text-xs text-slate-500">Hours: {siteInfo.hours}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-charcoal-800 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} {siteInfo.name}. All rights reserved.</p>
          <a href="https://www.cibirix.com" target="_blank" rel="noreferrer" className="transition hover:text-slate-300">Website by Cibirix</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
