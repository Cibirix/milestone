import { IconType } from 'react-icons'
import { FaCarSide, FaWarehouse } from 'react-icons/fa'
import { FiGrid, FiTool } from 'react-icons/fi'
import { GiBarn } from 'react-icons/gi'
import { MdGarage } from 'react-icons/md'

type CategoryTheme = {
  Icon: IconType
  accentClass: string
  surfaceClass: string
  ringClass: string
  summaryLabel: string
}

export function getCategoryTheme(category: string): CategoryTheme {
  switch (category) {
    case 'Garages':
      return {
        Icon: MdGarage,
        accentClass: 'from-brand-700 via-brand-800 to-charcoal-950',
        surfaceClass: 'bg-brand-50 text-brand-800',
        ringClass: 'ring-brand-200/70',
        summaryLabel: 'Vehicle protection and enclosed storage',
      }
    case 'Workshops':
      return {
        Icon: FiTool,
        accentClass: 'from-charcoal-900 via-brand-800 to-charcoal-950',
        surfaceClass: 'bg-slate-100 text-charcoal-900',
        ringClass: 'ring-slate-300/70',
        summaryLabel: 'Work-ready layouts with flexible access',
      }
    case 'Agricultural Buildings':
      return {
        Icon: GiBarn,
        accentClass: 'from-emerald-700 via-emerald-800 to-charcoal-950',
        surfaceClass: 'bg-emerald-50 text-emerald-800',
        ringClass: 'ring-emerald-200/70',
        summaryLabel: 'Equipment, hay, and high-clearance coverage',
      }
    case 'Carports':
      return {
        Icon: FaCarSide,
        accentClass: 'from-rust-500 via-brand-800 to-charcoal-950',
        surfaceClass: 'bg-rust-50 text-rust-700',
        ringClass: 'ring-rust-200/70',
        summaryLabel: 'Open-span weather protection for daily use',
      }
    default:
      return {
        Icon: FaWarehouse,
        accentClass: 'from-brand-600 via-brand-800 to-charcoal-950',
        surfaceClass: 'bg-brand-50 text-brand-800',
        ringClass: 'ring-brand-200/70',
        summaryLabel: 'Flexible metal building layouts for custom projects',
      }
  }
}

const CategoryIcon = ({
  category,
  className = 'h-5 w-5',
}: {
  category: string
  className?: string
}) => {
  const { Icon } = getCategoryTheme(category)
  return <Icon className={className} aria-hidden="true" />
}

export default CategoryIcon
