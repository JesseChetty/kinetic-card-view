export const windowData = [
  {
    id: 'hero',
    title: 'Hero',
    description: 'Welcome to my portfolio',
    icon: 'star',
    type: 'hero'
  },
  {
    id: 'about',
    title: 'About',
    description: 'Learn more about me',
    icon: 'user',
    type: 'content'
  },
  {
    id: 'skills',
    title: 'Skills',
    description: 'My technical expertise',
    icon: 'code',
    type: 'content'
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'My latest work',
    icon: 'briefcase',
    type: 'content'
  },
  {
    id: 'testimonials',
    title: 'Testimonials',
    description: 'What clients say',
    icon: 'comments',
    type: 'content'
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Get in touch',
    icon: 'envelope',
    type: 'content'
  }
];

export const skillsData = [
  {
    name: 'React',
    level: 95,
    icon: 'react',
    category: 'Frontend'
  },
  {
    name: 'TypeScript',
    level: 90,
    icon: 'js',
    category: 'Language'
  },
  {
    name: 'Next.js',
    level: 88,
    icon: 'code',
    category: 'Framework'
  },
  {
    name: 'Node.js',
    level: 85,
    icon: 'server',
    category: 'Backend'
  },
  {
    name: 'Tailwind CSS',
    level: 92,
    icon: 'palette',
    category: 'Styling'
  },
  {
    name: 'Python',
    level: 83,
    icon: 'python',
    category: 'Language'
  }
];

export const projectsData = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true
  },
  {
    id: 2,
    title: 'AI Dashboard',
    description: 'Analytics dashboard with machine learning insights and data visualization',
    technologies: ['React', 'Python', 'TensorFlow', 'D3.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'JWT'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false
  }
];

export const testimonialsData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    content: 'Outstanding work! The portfolio showcase was delivered on time and exceeded our expectations. Professional, creative, and highly skilled.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1a8?w=150',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager, InnovateCorp',
    content: 'Incredible attention to detail and technical expertise. The project was completed flawlessly with excellent communication throughout.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'CTO, Digital Solutions',
    content: 'A true professional who understands both design and development. Delivered a beautiful, functional solution that our users love.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 5
  }
];

export const servicesData = [
  {
    id: 1,
    title: 'Frontend Development',
    description: 'Modern, responsive web applications using React, Next.js, and TypeScript',
    icon: 'code',
    features: ['React/Next.js', 'TypeScript', 'Responsive Design', 'Performance Optimization']
  },
  {
    id: 2,
    title: 'Backend Development',
    description: 'Scalable server-side solutions with Node.js, Python, and cloud services',
    icon: 'server',
    features: ['Node.js/Python', 'Database Design', 'API Development', 'Cloud Deployment']
  },
  {
    id: 3,
    title: 'Full-Stack Solutions',
    description: 'Complete web applications from concept to deployment',
    icon: 'layers',
    features: ['End-to-end Development', 'Database Integration', 'Authentication', 'DevOps']
  }
];

export const contactInfo = {
  email: 'hello@portfolio.dev',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  }
};