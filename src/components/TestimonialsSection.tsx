import { FiStar } from 'react-icons/fi'
import Script from 'next/script'
import { testimonials, siteInfo } from '@/data/siteData'

type TestimonialItem = {
  name: string
  location: string
  rating: number
  text: string
  date: string
}

type TestimonialsSectionProps = {
  testimonialsList?: TestimonialItem[]
  businessName?: string
}

const TestimonialsSection = ({ testimonialsList = testimonials, businessName = siteInfo.name }: TestimonialsSectionProps) => {
  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: testimonialsList.length.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: testimonialsList.map((testimonial) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: testimonial.name,
      },
      datePublished: testimonial.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: testimonial.text,
    })),
  }

  return (
    <>
      <Script
        id="review-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">Reviews</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Trusted by Maryland homeowners and businesses</h2>
            <p className="text-slate-600 mt-3">Consistent quality, responsive crews, and clear communication.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsList.map((testimonial) => (
              <div key={testimonial.name} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, index) => (
                    <FiStar key={index} className={index < testimonial.rating ? 'fill-yellow-400' : 'text-slate-300'} />
                  ))}
                </div>
                <p className="text-slate-700 italic">“{testimonial.text}”</p>
                <div className="mt-4">
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default TestimonialsSection
