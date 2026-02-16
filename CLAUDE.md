# FreshMix Store

A SaaS juice delivery web app built as a portfolio project. Users can customize fresh juice mixes, browse a pre-made menu, and place delivery orders across Moroccan cities.

## Tech Stack

- **Framework:** React 19 + Vite 7
- **Routing:** React Router DOM 7
- **State Management:** Zustand 5 (with localStorage persistence)
- **Styling:** Tailwind CSS 4 (custom theme with glassmorphism, gradients, animations)
- **Animations:** Framer Motion 12
- **Icons:** Lucide React
- **i18n:** i18next (EN, FR, AR, ES) with RTL support
- **Extras:** Canvas Confetti, Lottie React Player

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx            # Fixed header, nav links, cart badge, language switcher
│   ├── Hero.jsx              # Landing hero with animated gradient background
│   ├── FruitMixer.jsx        # Core feature: interactive juice customizer (largest component)
│   ├── ProductShowcase.jsx   # 3D parallax product cards with preset loading
│   ├── HowItWorks.jsx        # 3-step process section
│   ├── Testimonials.jsx      # Auto-rotating customer reviews carousel
│   ├── JuiceShowcase.jsx     # Premium juice bottle gallery (10 juices)
│   ├── Footer.jsx            # Newsletter, social links, contact info
│   ├── OrderForm.jsx         # Checkout form, validation, confetti on success
│   ├── FruitIcon.jsx         # 14 unique SVG fruit illustrations
│   ├── LanguageSwitcher.jsx  # 4-language dropdown with flags
│   └── DeliveryTracking.jsx  # Animated delivery progress tracker
├── pages/
│   ├── Home.jsx              # Landing page (lazy-loaded sections)
│   ├── Mixer.jsx             # FruitMixer wrapper
│   ├── Menu.jsx              # Pre-made juice catalog with category filters
│   └── Checkout.jsx          # OrderForm wrapper
├── store/
│   └── useStore.js           # Zustand store (fruits, cart, pricing, presets, language)
├── data/
│   └── fruits.js             # Legacy fruit definitions (unused, data lives in store)
├── i18n/
│   └── index.js              # i18next config + all translation resources
├── App.jsx                   # Router setup, RTL/LTR handling, AnimatePresence
├── main.jsx                  # React DOM entry point
└── index.css                 # Tailwind imports, custom theme, utility classes, animations
```

## Routes

| Path        | Page       | Description                          |
|-------------|------------|--------------------------------------|
| `/`         | Home       | Landing: Hero, HowItWorks, Showcase, Testimonials |
| `/mixer`    | Mixer      | Interactive juice customizer         |
| `/menu`     | Menu       | Pre-made juice catalog with filters  |
| `/checkout` | Checkout   | Order form + delivery tracking       |

## State Management (Zustand)

**Store:** `src/store/useStore.js`

- `selectedFruits` — array of fruit objects in the mix (max 8)
- `selectedSize` — bottle size: `small` / `medium` / `large`
- `selectedLiquid` — base liquid: `water` / `milk` / `orange`
- `addIce` — boolean
- `language` — current language code
- `orderDetails` / `isCheckoutComplete` — checkout state

**Key actions:** `addFruit`, `removeFruit`, `setSize`, `setLiquid`, `toggleIce`, `clearMixer`, `calculateTotal`, `getMixedColor`, `loadPreset`, `setLanguage`

**Pricing (DH):** fruit prices (2-12) + bottle size (5-10) + liquid (0-5) + ice (1)

**Persisted to localStorage:** fruits, size, liquid, ice, language

## Key Features

1. **Interactive Juice Mixer** — tap/drag fruits into a bottle with real-time fill animation, color blending, ice cubes, bubbles, and floating fruit icons
2. **Pre-made Menu** — 8 recipes filterable by category (Energy, Detox, Immunity, Refreshing)
3. **Multilingual (4 languages)** — EN, FR, AR (RTL), ES with full translation coverage
4. **Checkout Flow** — form validation, COD/Card payment, confetti celebration, mock order number
5. **Delivery Tracking** — animated SVG map with 4-stage progression and countdown timer
6. **3 Quick Presets** — Tropical, Berry, Green pre-configured mixes
7. **Responsive** — mobile-first with separate mobile/desktop layouts for the mixer

## Styling Conventions

- **Brand colors:** Primary `#FF6B35` (orange), Secondary `#00D4AA` (teal), Accent `#FFE66D` (yellow)
- **Fonts:** Sora (headings), Inter (body)
- **Custom CSS classes:** `.glass`, `.glass-dark`, `.gradient-text`, `.card`, `.card-glass`, `.btn-primary`, `.btn-secondary`, `.hover-lift`, `.hover-scale`, `.animate-float`, `.animate-pulse-glow`
- Tailwind utility-first with custom theme variables in `index.css`

## Backend Status

No real backend — order submission and delivery tracking are simulated with `setTimeout`/`Promise`. Ready for API integration at:
- `OrderForm.handleSubmit()` — replace with real order API
- `DeliveryTracking` — replace with real status polling

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build (output: dist/)
npm run preview  # Preview production build
npm run lint     # ESLint
```

## Notes

- `src/data/fruits.js` is legacy/unused — canonical fruit data lives in `useStore.js`
- Checkout redirects to `/mixer` if no fruits are selected
- RTL direction is set on `<html>` element when Arabic is selected
- 9 Moroccan cities available in the checkout city dropdown
- FruitMixer.jsx is the largest component (~1094 lines) — candidate for refactoring
