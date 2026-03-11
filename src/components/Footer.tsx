import Link from 'next/link'
import Image from 'next/image'
import { FiMail, FiMapPin, FiPhone, FiShield, FiTool } from 'react-icons/fi'
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

const productLinks = [
  { label: 'All Products', href: '/products' },
  { label: 'Service Area', href: '/service-area' },
  { label: 'Financing', href: '/rto-financing' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const Footer = ({ siteInfo }: FooterProps) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-[#101922] text-slate-100">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      
      {/* Main footer content */}
      <div className="container-custom relative z-10 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.8fr_0.95fr_1fr]">

          {/* Brand column */}
          <div>
            <Image
              src="/brand/milestone-logo-transparent.png"
              alt="Milestone Structures"
              width={200}
              height={60}
              className="h-10 w-auto object-contain brightness-200"
            />
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              {siteInfo.footerSummary ||
                'Milestone Structures delivers custom metal buildings with hands-on project guidance and a cleaner path from first inquiry to finished structure.'}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={siteInfo.social.facebook}
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/8 text-slate-400 transition hover:border-rust-700 hover:bg-rust-700 hover:text-white"
              >
                <FaFacebookF className="text-xs" />
              </a>
              <a
                href={siteInfo.social.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/8 text-slate-400 transition hover:border-rust-700 hover:bg-rust-700 hover:text-white"
              >
                <FaInstagram className="text-xs" />
              </a>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Quick Links</h4>
            <ul className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Milestone */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Why Milestone</h4>
            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <FiShield className="mt-0.5 shrink-0 text-rust-500" />
                <p className="text-sm leading-6 text-slate-400">Veteran-owned and operated with disciplined customer service.</p>
              </div>
              <div className="flex items-start gap-3">
                <FiTool className="mt-0.5 shrink-0 text-rust-500" />
                <p className="text-sm leading-6 text-slate-400">Garages, workshops, barns, carports, and commercial structures.</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Contact</h4>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={`tel:${siteInfo.phoneDigits}`}
                  className="flex items-start gap-3 text-sm text-slate-400 transition hover:text-white"
                >
                  <FiPhone className="mt-0.5 shrink-0 text-rust-500" />
                  {siteInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="flex items-start gap-3 text-sm text-slate-400 transition hover:text-white"
                >
                  <FiMail className="mt-0.5 shrink-0 text-rust-500" />
                  {siteInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <FiMapPin className="mt-0.5 shrink-0 text-rust-500" />
                <span>{siteInfo.address}</span>
              </li>
              <li className="text-sm text-slate-500">Hours: {siteInfo.hours}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-custom flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {currentYear} {siteInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <a href="#top" className="transition hover:text-white">Back to Top</a>
            <a href="https://cibirix.com" target="_blank" rel="noreferrer" className="transition hover:text-white">
              Website by Cibirix
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
