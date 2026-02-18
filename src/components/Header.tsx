'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiMenu, FiPhone, FiX } from 'react-icons/fi'

type HeaderProps = {
  siteInfo: {
    phone: string
    phoneDigits: string
  }
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const Header = ({ siteInfo }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="border-b border-slate-200 bg-slate-950 text-slate-100">
        <div className="container-custom flex items-center justify-between gap-3 py-2 text-xs sm:text-sm">
          <p className="font-medium text-slate-300">Veteran-led metal building dealer with nationwide service focus</p>
          <div className="flex items-center gap-2">
            <a href={`tel:${siteInfo.phoneDigits}`} className="hidden rounded-md px-3 py-1.5 text-slate-200 transition hover:bg-slate-800 sm:inline-flex">
              <FiPhone className="mr-2" /> {siteInfo.phone}
            </a>
            <button type="button" className="rounded-md bg-rust-600 px-3 py-1.5 font-semibold text-white transition hover:bg-rust-700">
              3D Builder
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom flex items-center justify-between gap-4 py-3 lg:py-4">
        <Link href="/" className="group" onClick={closeMenu}>
          <p className="font-display text-2xl tracking-wide text-brand-900">MILESTONE</p>
          <p className="-mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-charcoal-600">Steel Structures</p>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-slate-700 transition hover:text-brand-700">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${siteInfo.phoneDigits}`} className="btn-outline px-4 py-2 text-sm">
            <FiPhone className="mr-2" /> {siteInfo.phone}
          </a>
          <Link href="/contact" className="btn-primary px-4 py-2 text-sm">
            Get a Quote
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md border border-slate-200 p-2 text-slate-700 lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="container-custom pb-4 lg:hidden">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={closeMenu} className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <button type="button" className="btn-secondary text-sm">3D Builder</button>
              <Link href="/contact" onClick={closeMenu} className="btn-primary text-sm">Get a Quote</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
