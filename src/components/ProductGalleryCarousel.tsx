'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'

type GalleryProduct = {
  slug: string
  name: string
  category: string
  image: string
}

type ProductGalleryCarouselProps = {
  products: GalleryProduct[]
}

const ProductGalleryCarousel = ({ products }: ProductGalleryCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const safeIndex = products.length ? Math.min(activeIndex, products.length - 1) : 0
  const activeProduct = products[safeIndex]

  const goTo = (index: number) => {
    if (!products.length) return
    const total = products.length
    const nextIndex = (index + total) % total
    setActiveIndex(nextIndex)
  }

  if (!products.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="font-semibold text-charcoal-900">Gallery items will appear here as products are added.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">Gallery</p>
            <p className="mt-1 text-sm text-charcoal-600">Use arrows or thumbnails to browse. Tap/click the main image for the product name.</p>
          </div>
          <div className="rounded-full border border-slate-200 bg-stone-50 px-3 py-1 text-xs font-semibold text-charcoal-700">
            {safeIndex + 1} / {products.length}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="relative block h-[320px] w-full text-left sm:h-[430px] lg:h-[500px]"
            aria-label={`Open image preview for ${activeProduct.name}`}
          >
            <Image
              src={activeProduct.image}
              alt={activeProduct.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-tan-100">
                {activeProduct.category}
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => goTo(safeIndex - 1)}
            aria-label="Previous product image"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-slate-950/70 p-2 text-white transition hover:bg-slate-950/90"
          >
            <FiChevronLeft className="text-xl" />
          </button>
          <button
            type="button"
            onClick={() => goTo(safeIndex + 1)}
            aria-label="Next product image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-slate-950/70 p-2 text-white transition hover:bg-slate-950/90"
          >
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-charcoal-900">Product Thumbnails</p>
          <p className="text-xs text-charcoal-500">Tap/click any image to switch the main view</p>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {products.map((product, index) => {
            const active = index === safeIndex
            return (
              <button
                key={product.slug}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`group relative w-[190px] shrink-0 overflow-hidden rounded-xl border bg-slate-100 text-left shadow-sm transition ${
                  active
                    ? 'border-brand-500 ring-2 ring-brand-200'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                aria-label={`Show ${product.name}`}
              >
                <div className="relative h-28">
                  <Image src={product.image} alt={product.name} fill className="object-cover transition duration-300 group-hover:scale-[1.02]" />
                </div>
                <div className="p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-700">{product.category}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 z-[80] bg-slate-950/90 p-4 sm:p-8" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Close image preview"
          >
            <FiX className="text-xl" />
          </button>

          <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-center">
            <div className="w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-2xl">
              <div className="relative aspect-[16/10] w-full">
                <Image src={activeProduct.image} alt={activeProduct.name} fill className="object-contain bg-slate-950" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-slate-900/95 px-4 py-3">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-tan-200">{activeProduct.category}</p>
                <p className="text-sm text-white">{activeProduct.name}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductGalleryCarousel
