import { Metadata } from 'next'
import { FiCheckCircle } from 'react-icons/fi'
import { siteInfo } from '@/data/siteData'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about the veteran-led story and mission behind Milestone Steel Structures.',
}

const AboutPage = () => (
  <>
    <section className="bg-brand-900 py-16 text-white">
      <div className="container-custom">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-tan-200">About Milestone</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Built on discipline, honesty, and service</h1>
        <p className="mt-4 max-w-3xl text-slate-200">
          After serving in the Marine Corps, Josh launched Milestone Steel Structures with his wife to deliver quality custom buildings backed by dependable guidance from first call to final install.
        </p>
      </div>
    </section>

    <section className="bg-white py-14">
      <div className="container-custom grid grid-cols-1 gap-10 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 p-8">
          <h2 className="font-display text-2xl text-charcoal-900">Why the name Milestone?</h2>
          <p className="mt-4 text-charcoal-700">
            The business name represents two journeys: a major milestone for our family as we built this company, and a milestone for each customer building something meaningful for their future.
          </p>
          <p className="mt-3 text-charcoal-700">
            Every completed structure is more than a project. It is a step toward your goals, your plans, and your legacy.
          </p>
        </article>

        <article className="rounded-2xl border border-brand-100 bg-brand-50 p-8">
          <h2 className="font-display text-2xl text-brand-900">What sets us apart</h2>
          <div className="mt-4 space-y-3 text-charcoal-700">
            <p className="flex gap-2"><FiCheckCircle className="mt-1 text-brand-700" /> Fully customizable building options</p>
            <p className="flex gap-2"><FiCheckCircle className="mt-1 text-brand-700" /> Veteran-level discipline and reliability</p>
            <p className="flex gap-2"><FiCheckCircle className="mt-1 text-brand-700" /> Hands-on project support from start to finish</p>
            <p className="flex gap-2"><FiCheckCircle className="mt-1 text-brand-700" /> Transparent communication through delivery</p>
          </div>
        </article>
      </div>
    </section>

    <section className="bg-slate-50 py-12">
      <div className="container-custom rounded-2xl border border-slate-200 bg-white p-8">
        <h2 className="font-display text-2xl text-charcoal-900">Service Coverage</h2>
        <p className="mt-3 text-charcoal-700">{siteInfo.serviceArea}</p>
      </div>
    </section>
  </>
)

export default AboutPage
