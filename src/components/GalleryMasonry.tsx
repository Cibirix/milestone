'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { FiArrowRight, FiX } from 'react-icons/fi'

type GalleryTile = {
  id: string
  title: string
  category: string
  image: string
  alt: string
  sku?: string
  location?: string
  href?: string
}

type GalleryMasonryProps = {
  tiles: GalleryTile[]
}

const allFilter = 'All'
const initialVisibleCount = 12
const stepVisibleCount = 9
const aspectPattern = ['aspect-[4/5]', 'aspect-[4/3]', 'aspect-[1/1]', 'aspect-[3/4]']

const GalleryMasonry = ({ tiles }: GalleryMasonryProps) => {
  const [activeFilter, setActiveFilter] = useState(allFilter)
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const categories = useMemo(
    () => Array.from(new Set(tiles.map((tile) => tile.category))).sort(),
    [tiles],
  )

  const filteredTiles = useMemo(
    () =>
      activeFilter === allFilter
        ? tiles
        : tiles.filter((tile) => tile.category === activeFilter),
    [activeFilter, tiles],
  )

  const visibleTiles = filteredTiles.slice(0, visibleCount)
  const hasMore = visibleCount < filteredTiles.length
  const selectedTile = selectedId ? tiles.find((tile) => tile.id === selectedId) : undefined

  if (!tiles.length) {
    return (
      <div className="panel-card p-10 text-center">
        <p className="text-base font-semibold text-charcoal-900">Gallery items will appear here as media is added.</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {[allFilter, ...categories].map((filter) => {
            const active = activeFilter === filter
            return (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setActiveFilter(filter)
                  setVisibleCount(initialVisibleCount)
                }}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
                  active
                    ? 'border-rust-700 bg-rust-700 text-white'
                    : 'border-slate-200 bg-white text-charcoal-700 hover:border-rust-200 hover:text-rust-700'
                }`}
              >
                {filter}
              </button>
            )
          })}
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal-400">
          {filteredTiles.length} items
        </p>
      </div>

      <div className="mt-6 grid items-start gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visibleTiles.map((tile, index) => (
          <article
            key={tile.id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_40px_-22px_rgba(15,29,54,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_-20px_rgba(15,29,54,0.28)]"
          >
            <button
              type="button"
              onClick={() => setSelectedId(tile.id)}
              className="block w-full text-left"
            >
              <div className={`relative w-full overflow-hidden ${aspectPattern[index % aspectPattern.length]}`}>
                <Image
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  unoptimized
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101922]/82 via-[#101922]/25 to-transparent" />
                <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-2">
                  <span className="rounded-full border border-white/20 bg-white/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
                    {tile.category}
                  </span>
                  {tile.sku && (
                    <span className="rounded-full bg-[#101922]/75 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-tan-100">
                      {tile.sku}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="line-clamp-2 text-base font-bold text-white">{tile.title}</p>
                  {tile.location && <p className="mt-1 text-xs text-slate-200">{tile.location}</p>}
                </div>
              </div>
            </button>
            {tile.href && (
              <div className="border-t border-slate-200 px-4 py-3">
                <Link
                  href={tile.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-rust-700 transition hover:text-rust-800"
                >
                  View model <FiArrowRight />
                </Link>
              </div>
            )}
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + stepVisibleCount)}
            className="btn-outline"
          >
            Load More Projects
          </button>
        </div>
      )}

      {selectedTile && (
        <div className="fixed inset-0 z-[90] bg-[#101922]/90 p-4 sm:p-8" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Close gallery preview"
          >
            <FiX className="text-lg" />
          </button>
          <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-center">
            <div className="w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-900">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={selectedTile.image}
                  alt={selectedTile.alt}
                  fill
                  unoptimized
                  className="object-contain bg-[#0b1525]"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
                <div>
                  <p className="text-sm font-bold text-white">{selectedTile.title}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-300">{selectedTile.category}</p>
                </div>
                {selectedTile.href && (
                  <Link
                    href={selectedTile.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-rust-300 transition hover:text-rust-200"
                  >
                    Open product <FiArrowRight />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GalleryMasonry
