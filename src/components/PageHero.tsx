import Link from 'next/link'

type PageHeroAction = {
  href: string
  label: string
  variant?: 'primary' | 'secondary'
  external?: boolean
}

type PageHeroStat = {
  label: string
  value: string
}

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
  badge?: string
  actions?: PageHeroAction[]
  stats?: PageHeroStat[]
  compact?: boolean
}

const PageHero = ({
  eyebrow,
  title,
  description,
  badge,
  actions = [],
  stats = [],
  compact = false,
}: PageHeroProps) => (
  <section className="relative overflow-hidden border-b border-slate-200 bg-[#101922] text-white">
    {/* Subtle grid texture */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    />
    {/* Red glow accent */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(185,28,28,0.12) 0%, transparent 60%)' }}
    />

    <div className={`container-custom relative ${compact ? 'py-10 md:py-12' : 'py-14 md:py-18'}`}>
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-block rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-rust-400">
          {eyebrow}
        </span>

        {badge && (
          <div className="mt-3 inline-flex rounded-full border border-rust-800 bg-rust-900/50 px-3.5 py-1.5 text-sm font-semibold text-rust-300">
            {badge}
          </div>
        )}

        <h1
          className={`mx-auto mt-4 max-w-4xl font-display font-black leading-tight text-white ${
            compact ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-4xl md:text-5xl lg:text-6xl'
          }`}
        >
          {title}
        </h1>

        <p className={`mx-auto mt-4 max-w-3xl leading-7 text-slate-400 ${compact ? 'text-[15px]' : 'text-base'}`}>
          {description}
        </p>

        {actions.length > 0 && (
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {actions.map((action) =>
              action.external ? (
                <a
                  key={`${action.href}-${action.label}`}
                  href={action.href}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    action.variant === 'secondary'
                      ? 'inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20'
                      : 'inline-flex items-center gap-2 rounded-lg bg-rust-700 px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(185,28,28,0.5)] transition hover:bg-rust-800'
                  }
                >
                  {action.label}
                </a>
              ) : (
                <Link
                  key={`${action.href}-${action.label}`}
                  href={action.href}
                  className={
                    action.variant === 'secondary'
                      ? 'inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20'
                      : 'inline-flex items-center gap-2 rounded-lg bg-rust-700 px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(185,28,28,0.5)] transition hover:bg-rust-800'
                  }
                >
                  {action.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>

      {stats.length > 0 && (
        <div className={`mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 xl:grid-cols-3 ${compact ? 'mt-7' : 'mt-10'}`}>
          {stats.map((stat) => (
            <div
              key={`${stat.label}-${stat.value}`}
              className="rounded-2xl border border-white/10 bg-white/6 p-5 text-center backdrop-blur"
            >
              <p className="text-3xl font-black text-rust-400">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
)

export default PageHero
