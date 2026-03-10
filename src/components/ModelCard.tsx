import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

type ModelCardProps = {
  href: string
  title: string
  imageSrc?: string
  imageAlt: string
  category?: string
  priceLabel?: string
  imageHeightClassName?: string
}

const ModelCard = ({
  href,
  title,
  imageSrc,
  imageAlt,
  category,
  priceLabel,
  imageHeightClassName = 'h-48',
}: ModelCardProps) => (
  <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_4px_20px_-8px_rgba(15,29,54,0.12)] transition duration-300 hover:-translate-y-1 hover:border-rust-200 hover:shadow-[0_16px_40px_-12px_rgba(15,29,54,0.2)]">
    {/* Image */}
    <Link href={href} className={`relative block overflow-hidden bg-slate-100 ${imageHeightClassName}`} tabIndex={-1}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
          loading="eager"
          unoptimized
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#101922]/20 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

      {category && (
        <div className="absolute left-3 top-3">
          <span className="inline-block rounded-md bg-[#101922]/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur">
            {category}
          </span>
        </div>
      )}
    </Link>

    {/* Content */}
    <div className="flex flex-1 flex-col px-4 py-4">
      <h3 className="line-clamp-2 text-base font-bold leading-snug text-charcoal-900">
        <Link href={href} className="transition hover:text-rust-700">
          {title}
        </Link>
      </h3>

      {priceLabel && (
        <p className="mt-2 text-sm font-semibold text-charcoal-600">{priceLabel}</p>
      )}

      <div className="mt-auto pt-3">
        <Link
          href={href}
          aria-label={`View details for ${title}`}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-charcoal-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-charcoal-800"
        >
          View Model
          <FiArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  </article>
)

export default ModelCard
