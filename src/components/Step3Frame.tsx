import React from 'react'

interface Step3FrameProps {
  title?: string
  description?: string
  children?: React.ReactNode
  className?: string
}

const Step3Frame: React.FC<Step3FrameProps> = ({
  title = 'Step 3',
  description,
  children,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full rounded-2xl border border-slate-200/90 bg-white/95 p-8 shadow-[0_26px_80px_-46px_rgba(15,29,54,0.18)] backdrop-blur ${className}`}
    >
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="font-display text-5xl font-semibold leading-tight text-[#ff8303] md:text-6xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            {description}
          </p>
        )}
      </div>

      {/* Content Section */}
      {children && (
        <div className="mt-6 space-y-4">
          {children}
        </div>
      )}
    </div>
  )
}

export default Step3Frame
