import React from 'react'
import Step3Frame from '@/components/Step3Frame'

const Step3Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container-custom">
        <Step3Frame
          title="Step 3: Frame"
          description="This is the Step 3 Frame component replicated from the design system."
        >
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="mb-3 font-display text-xl font-bold text-charcoal-900">
                Component Features
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#ff8303]" />
                  <span>Modern design with Tailwind CSS v4</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#ff8303]" />
                  <span>Fully customizable props</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#ff8303]" />
                  <span>Responsive layout</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#ff8303]" />
                  <span>TypeScript support</span>
                </li>
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h4 className="mb-2 font-semibold text-charcoal-900">
                  Design System
                </h4>
                <p className="text-sm text-slate-600">
                  Built with design tokens and consistent spacing
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h4 className="mb-2 font-semibold text-charcoal-900">
                  Accessibility
                </h4>
                <p className="text-sm text-slate-600">
                  Semantic HTML and proper contrast ratios
                </p>
              </div>
            </div>
          </div>
        </Step3Frame>
      </div>
    </div>
  )
}

export default Step3Page
