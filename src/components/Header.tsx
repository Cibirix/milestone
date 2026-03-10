'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiChevronDown, FiMenu, FiPhone, FiTool, FiX } from 'react-icons/fi'
import CategoryIcon from '@/components/CategoryIcon'
import { getCategoryMenuItems } from '@/lib/productCategories'

type HeaderProps = {
  siteInfo: {
    phone: string
    phoneDigits: string
    threeDBuilderUrl: string
  }
}

const navLinks = [
  { href: '/products', label: 'All Products' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/rto-financing', label: 'Financing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const Header = ({ siteInfo }: HeaderProps) => {
  const pathname = usePathname()
  const categoryMenuItems = getCategoryMenuItems()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
    setIsCategoriesOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActiveLink = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${isScrolled ? 'shadow-[0_4px_24px_-8px_rgba(15,29,54,0.14)]' : ''}`}>
      <div className="container-custom">
        {/* justify-between: logo pushes nav to center, right side stays tight */}
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" aria-label="Milestone Structures home" className="shrink-0">
            <Image
              src="/brand/milestone-logo-transparent.png"
              alt="Milestone Structures"
              width={170}
              height={50}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav — sits naturally between logo and right group */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCategoriesOpen((prev) => !prev)}
                aria-expanded={isCategoriesOpen}
                aria-haspopup="true"
                className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors ${
                  pathname.startsWith('/products/category/') ? 'text-rust-700' : 'text-charcoal-700 hover:text-rust-700'
                }`}
              >
                Building Styles
                <FiChevronDown className={`text-xs transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoriesOpen && (
                <div className="absolute left-0 top-full mt-2 w-68 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_16px_48px_-20px_rgba(15,29,54,0.2)]">
                  {categoryMenuItems.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/products/category/${category.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal-700 transition hover:bg-slate-50 hover:text-rust-700"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-rust-50 text-rust-700">
                        <CategoryIcon category={category.label} className="h-4 w-4" />
                      </span>
                      {category.menuLabel}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  isActiveLink(link.href) ? 'text-rust-700' : 'text-charcoal-700 hover:text-rust-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: call badge + 3D Builder CTA */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteInfo.phoneDigits}`}
              className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-charcoal-700 transition hover:border-rust-200 hover:bg-rust-50 hover:text-rust-700 lg:inline-flex xl:inline-flex"
              aria-label={`Call ${siteInfo.phone}`}
            >
              <FiPhone className="shrink-0 text-sm text-rust-700" />
              {siteInfo.phone}
            </a>

            {/* Primary CTA — 3D Builder */}
            <a
              href={siteInfo.threeDBuilderUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-lg bg-rust-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-rust-800 lg:inline-flex"
            >
              <FiTool className="text-xs" />
              3D Builder
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-charcoal-700 transition hover:bg-slate-100 lg:hidden"
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="container-custom py-4">
            <div className="flex flex-col gap-0.5">
              <Link
                href="/"
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${pathname === '/' ? 'bg-rust-50 text-rust-700' : 'text-charcoal-700 hover:bg-slate-50'}`}
              >
                Home
              </Link>

              <div className="overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                <button
                  type="button"
                  onClick={() => setIsCategoriesOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-semibold text-charcoal-700"
                >
                  Building Styles
                  <FiChevronDown className={`text-xs transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoriesOpen && (
                  <div className="border-t border-slate-100 px-2 pb-2">
                    {categoryMenuItems.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/products/category/${category.slug}`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-charcoal-700 hover:bg-white"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-rust-700 shadow-sm">
                          <CategoryIcon category={category.label} className="h-3.5 w-3.5" />
                        </span>
                        {category.menuLabel}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                    isActiveLink(link.href) ? 'bg-rust-50 text-rust-700' : 'text-charcoal-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
                <a
                  href={`tel:${siteInfo.phoneDigits}`}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-semibold text-charcoal-700"
                >
                  <FiPhone className="text-rust-700" /> {siteInfo.phone}
                </a>
                <a
                  href={siteInfo.threeDBuilderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-rust-700 py-2.5 text-sm font-bold text-white"
                >
                  <FiTool /> Open 3D Builder
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-bold text-charcoal-800"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
