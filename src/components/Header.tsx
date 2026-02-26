'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
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

const tickerMessages = [
  'Veteran-owned and operated metal building dealer with a multi-state service focus',
  'Extreme dedication to customer service from first call to final build',
  'Fully customizable metal buildings built around your exact vision',
  'Based in Pilot Mountain, NC and serving multi-state coverage areas',
]

const Header = ({ siteInfo }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [tickerIndex, setTickerIndex] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerMessages.length)
    }, 3500)

    return () => window.clearInterval(interval)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="border-b border-slate-200 bg-slate-950 text-slate-100">
        <div className="container-custom py-2 text-xs sm:text-sm">
          <p key={tickerIndex} className="text-center font-medium text-slate-300 transition-opacity duration-300">
            {tickerMessages[tickerIndex]}
          </p>
        </div>
      </div>

      <div className="container-custom flex items-center justify-between gap-4 py-2.5 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6 lg:py-3">
        <Link href="/" className="group lg:justify-self-start" onClick={closeMenu}>
          <Image
            src="/brand/milestone-logo-transparent.png"
            alt="Milestone Structures"
            width={260}
            height={260}
            className="h-[4.9rem] w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center justify-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative pb-1 text-sm font-semibold transition ${pathname === link.href ? 'text-brand-700' : 'text-slate-700 hover:text-brand-700'}`}
            >
              {link.label}
              <span
                className={`absolute left-0 -bottom-0.5 h-0.5 w-full rounded-full bg-brand-700 transition-all duration-200 ${pathname === link.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-3 lg:flex lg:justify-self-end">
          <a href={`tel:${siteInfo.phoneDigits}`} className="btn-outline px-5 py-2.5 text-base">
            <FiPhone className="mr-2" /> {siteInfo.phone}
          </a>
          <button type="button" className="rounded-lg bg-rust-600 px-5 py-2.5 text-base font-semibold text-white transition hover:bg-rust-700">
            3D Builder
          </button>
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
              <button type="button" className="rounded-lg bg-rust-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rust-700">3D Builder</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
