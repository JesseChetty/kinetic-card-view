# Portfolio Website Documentation

## Project Overview

This is a modern, interactive portfolio website built with React, TypeScript, and Tailwind CSS. It features a unique carousel-based navigation system where users can scroll through different sections horizontally, with each section displaying as a card that can be clicked for detailed modal views.

## Technology Stack

- **React 18** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Vite** - Build tool and development server
- **FontAwesome** - Icon library
- **shadcn/ui** - UI component library

## Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── Card.tsx           # Main card component for carousel items
│   ├── Carousel.tsx       # Horizontal scrolling carousel
│   ├── Modal.tsx          # Modal system for detailed views
│   ├── Navbar.tsx         # Top navigation with mobile menu
│   └── SEO.tsx            # SEO meta tags component
├── data/
│   └── portfolioData.ts   # All website content and data
├── pages/
│   ├── Index.tsx          # Main page component
│   └── NotFound.tsx       # 404 error page
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── index.css             # Global styles and design tokens
```

## Key Features

### 1. Carousel Navigation System
- **File**: `src/components/Carousel.tsx`
- Horizontal scrolling carousel that displays portfolio sections as cards
- Smooth scrolling with snap-to-center behavior
- Navigation indicators at the bottom
- Keyboard and mouse wheel support
- Mobile-friendly touch navigation

### 2. Card System
- **File**: `src/components/Card.tsx`
- Two card types: `hero` and standard cards
- Hero card: Large intro section with name and tagline
- Standard cards: Section previews with icons, titles, and descriptions
- Focus states with scaling animations
- Click interaction to open detailed modals

### 3. Modal System
- **File**: `src/components/Modal.tsx`
- Dynamic content rendering based on card type
- Sections include: About, Skills, Projects, Testimonials, Contact
- Responsive design with mobile-optimized layouts
- Smooth animations and backdrop blur effects

### 4. Responsive Navigation
- **File**: `src/components/Navbar.tsx`
- Desktop: Horizontal navigation bar with section indicators
- Mobile: Hamburger menu with slide-in navigation
- Active section highlighting
- Smooth scrolling to sections when clicked

### 5. SEO Optimization
- **File**: `src/components/SEO.tsx`
- Dynamic meta tags for title, description, keywords
- Canonical URLs
- Open Graph tags for social media sharing
- Structured data support

## Content Management

### Portfolio Data Structure
**File**: `src/data/portfolioData.ts`

All website content is stored in this single file, making it easy to update:

#### Navigation Windows (`windowData`)
```typescript
{
  id: string,           // Unique identifier
  title: string,        // Card title
  description: string,  // Card description
  icon: string,         // FontAwesome icon name
  type: 'hero' | 'standard' // Card display type
}
```

#### Skills (`skillsData`)
```typescript
{
  name: string,         // Skill name
  level: number,        // Proficiency level (0-100)
  icon: string,         // FontAwesome icon
  category: string      // Skill category
}
```

#### Projects (`projectsData`)
```typescript
{
  id: string,
  title: string,
  description: string,
  technologies: string[], // Array of tech stack
  image: string,          // Project image URL
  github: string,         // GitHub repository URL
  live: string,           // Live demo URL
  featured: boolean       // Featured project flag
}
```

#### Testimonials (`testimonialsData`)
```typescript
{
  id: string,
  name: string,          // Client name
  role: string,          // Client position
  content: string,       // Testimonial text
  avatar: string,        // Avatar image URL
  rating: number         // Rating (1-5)
}
```

#### Services (`servicesData`)
```typescript
{
  id: string,
  title: string,
  description: string,
  icon: string,
  features: string[]     // Array of service features
}
```

#### Contact Information (`contactInfo`)
```typescript
{
  email: string,
  phone: string,
  location: string,
  github: string,        // GitHub profile URL
  linkedin: string,      // LinkedIn profile URL
  twitter: string        // Twitter profile URL
}
```

## Design System

### Color Tokens
**File**: `src/index.css`

The website uses a semantic color system with CSS custom properties:

```css
:root {
  --background: /* Main background color */
  --foreground: /* Main text color */
  --primary: /* Brand primary color */
  --primary-foreground: /* Text on primary */
  --secondary: /* Secondary accent color */
  --muted: /* Muted/disabled elements */
  --card: /* Card background */
  --border: /* Border color */
  /* ... and more */
}
```

### Design Guidelines
- **Never use direct colors** like `text-white`, `bg-black`
- **Always use semantic tokens** like `text-foreground`, `bg-background`
- **Customize in** `src/index.css` and `tailwind.config.ts`
- **Dark/light mode** support built-in

## How to Customize

### 1. Update Content
Edit `src/data/portfolioData.ts`:
- **Personal Info**: Update hero section, contact details
- **Skills**: Add/remove skills, adjust proficiency levels
- **Projects**: Add new projects with images and links
- **Testimonials**: Add client feedback
- **Services**: Update service offerings

### 2. Add New Sections
1. Add new entry to `windowData` in `portfolioData.ts`
2. Update `Modal.tsx` to handle the new section type
3. Create content data structure if needed

### 3. Modify Styling
- **Colors**: Update CSS variables in `src/index.css`
- **Components**: Modify component styles using Tailwind classes
- **Animations**: Available in `tailwind.config.ts`

### 4. Add New Components
- Create in `src/components/`
- Follow existing patterns for consistency
- Use TypeScript interfaces for props
- Implement responsive design

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check
```

## Animation System

The website includes a comprehensive animation system:
- **Fade animations**: `animate-fade-in`, `animate-fade-out`
- **Scale animations**: `animate-scale-in`, `animate-scale-out`
- **Slide animations**: `animate-slide-in-right`
- **Hover effects**: `hover-scale`, `story-link`
- **Combined animations**: `animate-enter`, `animate-exit`

## Mobile Responsiveness

- **Carousel**: Touch-friendly horizontal scrolling
- **Navigation**: Hamburger menu with slide-in animation
- **Cards**: Responsive sizing and typography
- **Modals**: Mobile-optimized layouts and spacing
- **Touch interactions**: Optimized for mobile devices

## SEO Best Practices

- **Meta tags**: Dynamic title, description, keywords
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Image optimization**: Alt attributes and lazy loading
- **Performance**: Optimized assets and code splitting
- **Accessibility**: ARIA labels and keyboard navigation

## Deployment

The website can be deployed to any static hosting service:
- **Vercel**: Connect GitHub repository for automatic deployments
- **Netlify**: Drag and drop build folder or Git integration
- **GitHub Pages**: Use GitHub Actions for deployment
- **Traditional hosting**: Upload build folder to web server

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive enhancement**: Graceful degradation for older browsers

## Performance Considerations

- **Code splitting**: Automatic with Vite
- **Image optimization**: WebP format support
- **CSS optimization**: Purged unused styles
- **JavaScript**: Modern ES modules with fallbacks
- **Lazy loading**: Images and components loaded on demand

## Troubleshooting

### Common Issues
1. **Navigation glitches**: Check `focusedIndex` state management
2. **Carousel positioning**: Verify scroll calculations in `Carousel.tsx`
3. **Modal content**: Ensure data structure matches expected format
4. **Styling issues**: Check if semantic tokens are used correctly

### Debug Mode
Enable console logging in `Carousel.tsx` for navigation debugging.

## Contributing

When making changes:
1. **Test responsive design** on different screen sizes
2. **Check accessibility** with screen readers
3. **Validate TypeScript** types and interfaces
4. **Test navigation flow** between all sections
5. **Verify SEO tags** are updating correctly

## License

This project is available for personal and commercial use. Customize freely for your portfolio needs.