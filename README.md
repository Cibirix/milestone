# Hardmix Concrete Website

A modern, conversion-focused website for Hardmix Concrete built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 5 fully responsive pages (Home, Services, Service Areas, Contact, About)
- Mobile-first design with clean, professional UI
- Clear calls-to-action throughout
- Contact form for estimate requests
- SEO-optimized structure
- Fast loading performance
- Modern component architecture

## Pages

1. **Homepage** - Hero section, services overview, trust indicators, and CTAs
2. **Services** - Detailed service offerings with features and process overview
3. **Service Areas** - Interactive service area display covering 5 states
4. **Contact** - Full contact form for estimate requests with contact information
5. **About** - Company overview, values, and differentiators

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd hardmix-concrete-site
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
hardmix-concrete-site/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── service-areas/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── CTASection.tsx
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Customization

### Contact Information

Update contact details in:
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/app/contact/page.tsx`

### Colors

Modify the color scheme in `tailwind.config.js`:
- Primary: Blue shades
- Accent: Orange shades

### Form Submission

The contact form currently logs to console. To integrate with a backend:

1. Add your API endpoint in `src/app/contact/page.tsx`
2. Configure email service (SendGrid, AWS SES, etc.)
3. Or use a form service like Formspree or Netlify Forms

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Deploy automatically

### Other Platforms

Compatible with:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Any Node.js hosting platform

## Performance Features

- Optimized images with Next.js Image component (can be added)
- Automatic code splitting
- Server-side rendering
- Static generation where applicable
- Lazy loading of components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Proprietary - Built for Hardmix Concrete by Cibirix

## Support

For questions or modifications, contact the development team.

---

Built with care by Cibirix - Full-Service Digital Agency

