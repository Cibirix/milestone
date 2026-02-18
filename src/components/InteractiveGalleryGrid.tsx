'use client'

import { useMemo, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { interactiveGalleryImages } from '@/data/enhancements'
import { getAssetPath } from '@/lib/utils'

const allCategory = 'All Projects'

type GalleryItem = {
  src: string
  alt: string
  category: string
  location: string
}

type FilterValue = string | typeof allCategory

type InteractiveGalleryGridProps = {
  images?: GalleryItem[]
}

const InteractiveGalleryGrid = ({ images = interactiveGalleryImages }: InteractiveGalleryGridProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterValue>(allCategory)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const categories = useMemo(
    () => Array.from(new Set(images.map((item) => item.category))),
    [images],
  )

  const filteredImages = useMemo(
    () =>
      activeFilter === allCategory
        ? images
        : images.filter((image) => image.category === activeFilter),
    [activeFilter, images],
  )

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveFilter(allCategory)}
          className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
            activeFilter === allCategory
              ? 'bg-brand-700 border-brand-700 text-white'
              : 'bg-white border-slate-200 text-slate-700 hover:border-brand-300 hover:text-brand-700'
          }`}
        >
          {allCategory}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveFilter(category)}
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
              activeFilter === category
                ? 'bg-brand-700 border-brand-700 text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:border-brand-300 hover:text-brand-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setSelectedImage(image.src)}
            className="group relative h-64 rounded-2xl overflow-hidden shadow-sm text-left"
          >
            <img 
              src={getAssetPath(image.src)}
              alt={image.alt} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/85 to-transparent p-4">
              <p className="text-white text-sm font-semibold">{image.category}</p>
              <p className="text-slate-200 text-xs mt-1">{image.location}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[70] bg-slate-950/90 p-4 sm:p-8">
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close gallery preview"
          >
            <FiX className="text-xl" />
          </button>
          <div className="h-full w-full flex items-center justify-center">
            <div className="relative w-full max-w-5xl aspect-[16/10] rounded-xl overflow-hidden">
              <img src={getAssetPath(selectedImage)} alt="Gallery preview" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default InteractiveGalleryGrid
