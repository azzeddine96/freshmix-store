# FreshMix Store

A modern juice delivery web app where users create custom fruit blends through an interactive mixer with real-time animations, then order for delivery across Morocco.

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

**[Live Demo](https://freshmix-store.vercel.app)**

---

## Features

- **Interactive Juice Mixer** — Select from 14 fruits with real-time bottle fill animation, color blending, floating fruit icons, ice cubes, and bubble effects
- **Pre-made Menu** — 8 juice recipes filterable by category (Energy, Detox, Immunity, Refreshing)
- **Quick Presets** — Tropical, Berry, and Green instant mixes
- **Full Checkout Flow** — Form validation, COD/Card payment options, confetti celebration on order
- **Delivery Tracking** — Animated SVG map with 4-stage progress and countdown timer
- **4 Languages** — English, French, Arabic (with full RTL support), Spanish
- **Responsive Design** — Mobile-first with dedicated mobile and desktop layouts
- **Glassmorphism UI** — Gradient backgrounds, smooth micro-interactions, parallax product cards

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | React 19, Vite 7 |
| **Styling** | Tailwind CSS 4, custom glassmorphism theme |
| **Animations** | Framer Motion 12, Canvas Confetti, Lottie |
| **State** | Zustand 5 (persisted to localStorage) |
| **Routing** | React Router DOM 7 |
| **i18n** | i18next with RTL support |
| **Icons** | Lucide React + 14 custom SVG fruit illustrations |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — Hero, How It Works, Product Showcase, Testimonials |
| `/mixer` | Interactive juice customizer |
| `/menu` | Pre-made juice catalog with category filters |
| `/checkout` | Order form with delivery tracking |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/     # Navbar, Hero, FruitMixer, OrderForm, DeliveryTracking, etc.
├── pages/          # Home, Mixer, Menu, Checkout
├── store/          # Zustand store (cart, pricing, presets)
├── i18n/           # Translation resources (EN, FR, AR, ES)
├── App.jsx         # Router setup, RTL handling
└── index.css       # Tailwind config, custom theme, animations
```

## Author

**Azzeddine Fejri** — [Portfolio](https://azzeddinefejri.me) | [LinkedIn](https://www.linkedin.com/in/azzeddine-fejri/)
