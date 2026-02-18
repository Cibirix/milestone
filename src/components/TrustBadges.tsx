import Image from 'next/image'

const badges = [
  { src: '/brand/cert-bbb.png', alt: 'BBB Accredited Business' },
  { src: '/brand/cert-angies.png', alt: 'Angi Rated' },
  { src: '/brand/cert-gaf.png', alt: 'GAF Certified' },
  { src: '/brand/cert-james-hardy.png', alt: 'James Hardie Certified' },
  { src: '/brand/cert-tamko.png', alt: 'TAMKO Certified' },
  { src: '/brand/cert-top-500.png', alt: 'Qualified Remodeler Top 500' },
]

const TrustBadges = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
      {badges.map((badge) => (
        <div key={badge.alt} className="bg-white border border-slate-100 rounded-xl p-4 flex items-center justify-center shadow-sm">
          <Image src={badge.src} alt={badge.alt} width={120} height={60} className="h-10 w-auto" />
        </div>
      ))}
    </div>
  )
}

export default TrustBadges
