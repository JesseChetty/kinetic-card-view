# Portfolio Website with 3D Gitlantis Explorer

A modern, interactive portfolio website featuring a unique 3D ocean world explorer built with React, Three.js, and Tailwind CSS.

## 🌊 Features

- **Interactive 3D Portfolio Explorer**: Navigate through an immersive ocean world where projects appear as lighthouses and skills as floating buoys
- **Responsive Carousel View**: Traditional 2D gallery view for browsing portfolio content
- **Modern Design System**: Built with Tailwind CSS and shadcn/ui components
- **SEO Optimized**: Comprehensive meta tags, structured data, and semantic HTML
- **Dark/Light Mode Support**: Automatic theme switching based on user preference
- **Mobile Responsive**: Fully responsive design that works on all devices

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: Zustand
- **Icons**: FontAwesome, Lucide React
- **Animations**: Tailwind CSS animations with custom keyframes

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
├── components/ui/        # shadcn/ui components
├── components/gitlantis/ # 3D world components
├── data/                # Portfolio and asset configuration
├── hooks/               # Custom React hooks
├── pages/               # Page components
└── lib/                 # Utility functions
```

## 🎨 Customizing Your Portfolio

### Content Management

#### Portfolio Data (`src/data/portfolioData.ts`)

Edit your portfolio content by modifying the data structures:

```typescript
// Add/edit your projects
export const projectsData = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Project description",
    image: "/path/to/image.jpg",
    technologies: ["React", "TypeScript"],
    github: "https://github.com/...",
    live: "https://...",
    featured: true
  }
];

// Add/edit your skills
export const skillsData = [
  {
    name: "React",
    level: 90,
    category: "Frontend"
  }
];
```

#### Personal Information

Update contact info, social links, and testimonials in the same file.

### 🏗️ 3D Asset Management

#### Adding Custom 3D Models

1. **Place your 3D files** in the `public/models/` directory
2. **Configure assets** in `src/data/assets.ts`:

```typescript
export const boatAssets: AssetConfig[] = [
  {
    name: 'custom-boat',
    path: '/models/your-boat.glb',
    type: 'model',
    description: 'Your custom boat model'
  }
];

// Then update selected assets
export const selectedAssets = {
  boat: 'custom-boat', // Use your custom boat
  // ... other assets
};
```

#### Supported 3D Formats
- **GLB/GLTF**: Recommended for 3D models
- **OBJ**: Basic 3D models
- **JPG/PNG**: Textures
- **HDR**: Environment maps/skyboxes

#### 3D Model Requirements
- **Boat models**: Should be oriented facing forward (negative Z-axis)
- **Lighthouse models**: Should be vertically oriented
- **File size**: Keep under 5MB for good performance
- **Textures**: Power-of-2 dimensions (512x512, 1024x1024, etc.)

### 🎨 Design System Customization

#### Colors and Themes (`src/index.css`)

Customize your color palette:

```css
:root {
  --primary: 220 100% 50%;    /* Main brand color */
  --secondary: 200 80% 60%;   /* Secondary color */
  --accent: 280 90% 70%;      /* Accent color */
  
  /* Custom gradients */
  --gradient-primary: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
}
```

#### Typography and Spacing (`tailwind.config.ts`)

Modify design tokens:

```typescript
theme: {
  extend: {
    fontFamily: {
      sans: ['Your Font', 'sans-serif'],
    },
    colors: {
      // Use semantic color tokens
    }
  }
}
```

### 🌊 3D World Customization

#### Ocean Settings (`src/components/gitlantis/Ocean.tsx`)

- **Color**: Change `color="#0077be"` to your preferred ocean color
- **Size**: Modify `args={[200, 200, 50, 50]}` for ocean dimensions
- **Animation**: Adjust wave speed in `Math.sin(time * 0.5)`

#### Boat Controls (`src/components/gitlantis/Boat.tsx`)

- **Speed**: Change `speed = 0.1` for movement speed
- **Rotation**: Modify `rotationSpeed = 0.02` for turning speed
- **Camera**: Adjust follow distance in camera positioning logic

#### Lighthouse Positioning (`src/components/gitlantis/ProjectLighthouses.tsx`)

- **Circle radius**: Change `* 25` to spread lighthouses further/closer
- **Height**: Modify lighthouse geometry args for different sizes

#### Buoy Distribution (`src/components/gitlantis/SkillBuoys.tsx`)

- **Circle radius**: Change `radius = 15` for skill buoy placement
- **Random offset**: Adjust `offsetX/offsetZ` calculations for scatter

### 🎵 Adding Audio

1. **Add audio files** to `public/audio/`
2. **Configure in assets.ts**:

```typescript
export const audioAssets: AssetConfig[] = [
  {
    name: 'ocean-waves',
    path: '/audio/ocean-waves.mp3',
    type: 'audio',
    description: 'Ocean wave sounds'
  }
];
```

3. **Implement audio** in components using Web Audio API

### 📱 Responsive Design

The website automatically adapts to different screen sizes:

- **Desktop**: Full 3D experience with all UI elements
- **Tablet**: Optimized 3D controls and touch navigation
- **Mobile**: Simplified 3D view with touch-friendly controls

### ⚡ Performance Optimization

#### 3D Performance
- **Model optimization**: Use tools like gltf-pipeline to compress models
- **Texture compression**: Use compressed formats (KTX2, WebP)
- **LOD (Level of Detail)**: Implement different model qualities based on distance

#### Loading Optimization
- **Lazy loading**: 3D assets load progressively
- **Preloading**: Critical assets load first
- **Caching**: Browser caches 3D models after first load

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎮 3D Controls

- **WASD Keys**: Move the boat
- **Mouse**: Look around (when camera follow is disabled)
- **Click Lighthouses**: View project details
- **Hover Buoys**: See skill information
- **Compass**: Shows boat orientation
- **Minimap**: Overview of the 3D world
- **Breadcrumbs**: Navigation trail

## 🐛 Troubleshooting

### 3D World Not Loading
- Check browser WebGL support
- Verify 3D model file paths
- Look for console errors related to Three.js

### Performance Issues
- Reduce model polygon count
- Compress textures
- Lower canvas resolution in Canvas props

### Assets Not Loading
- Verify files are in `public/` directory
- Check file paths in `assets.ts`
- Ensure correct file formats

## 📦 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Deploy automatically on push

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`

### Custom Server
1. Run `npm run build`
2. Serve the `dist/` directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (especially 3D functionality)
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project as a template for your own portfolio!

---

**Happy coding! 🚀** If you create something cool with this template, we'd love to see it!