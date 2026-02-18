'use client'

import { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import Script from 'next/script'
import { faqs } from '@/data/siteData'

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">FAQs</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Answers to common questions</h2>
            <p className="text-slate-600 mt-3">
              We believe in clear expectations and fast response times. Here are the questions we get asked most.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-white border border-slate-200 rounded-xl shadow-sm"
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-lg font-semibold text-slate-900">{faq.question}</span>
                  {openIndex === index ? (
                    <FiChevronUp className="text-brand-600 text-xl" />
                  ) : (
                    <FiChevronDown className="text-slate-500 text-xl" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5 text-slate-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQSection
