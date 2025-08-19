# SiteLVA

A modern React application built with Vite, React Router, and Tailwind CSS for discovering amazing places and connecting with partners.

## Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design with dark/light theme support
- 🌙 **Theme Toggle** - Switch between dark and light themes
- 📱 **Mobile Responsive** - Optimized for all device sizes
- 🔍 **Fullscreen Support** - Fullscreen button (hidden on iPhone for compatibility)
- 🚀 **Fast Performance** - Built with Vite for lightning-fast development
- 🛣️ **React Router** - Client-side routing with React Router v7
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid UI development

## Pages

- **Home** (`/`) - Landing page with hero section and features
- **About** (`/about`) - Information about SiteLVA
- **Discover** (`/discover`) - Explore places and opportunities
- **Partners** (`/partners`) - Partnership information and contact form

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sitelva
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
sitelva/
├── app/
│   ├── components/
│   │   └── GlobalHeader.tsx    # Global header component
│   ├── routes/
│   │   ├── home.tsx           # Home page
│   │   ├── about.tsx          # About page
│   │   ├── discover.tsx       # Discover page
│   │   └── partners.tsx       # Partners page
│   ├── app.css               # Global styles with Tailwind
│   └── root.tsx              # Root layout component
├── public/                   # Static assets
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── vite.config.ts           # Vite configuration
└── package.json             # Project dependencies
```

## Global Header Features

The global header includes:

- **Logo** - SiteLVA branding with link to home
- **Navigation** - Links to About, Discover, and Partners pages
- **Theme Toggle** - Switch between dark and light themes
- **Fullscreen Button** - Toggle fullscreen mode (hidden on iPhone)

## Styling

This project uses Tailwind CSS for styling with:

- **Dark Mode Support** - Automatic dark/light theme switching
- **Responsive Design** - Mobile-first approach
- **Custom Components** - Reusable UI components
- **Smooth Transitions** - Hover effects and animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note:** Fullscreen functionality is disabled on iPhone devices as it's not supported by iOS Safari.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
