import { motion } from 'framer-motion';
import { useId } from 'react';

// SVG Fruit Icons - Professional vector illustrations with unique IDs
const getFruitSvg = (fruit, uniqueId) => {
  const fruitSvgs = {
    orange: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="36" r="24" fill={`url(#${uniqueId}-orangeGrad)`} />
        <ellipse cx="32" cy="36" rx="20" ry="20" fill={`url(#${uniqueId}-orangeInner)`} opacity="0.3" />
        <path d="M32 12V8" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="32" cy="10" rx="6" ry="3" fill="#66BB6A" />
        <path d="M28 14C28 14 30 16 32 16C34 16 36 14 36 14" stroke="#388E3C" strokeWidth="1.5" fill="none" />
        <circle cx="24" cy="32" r="3" fill="rgba(255,255,255,0.3)" />
        <defs>
          <linearGradient id={`${uniqueId}-orangeGrad`} x1="8" y1="12" x2="56" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFB74D" />
            <stop offset="1" stopColor="#FF9800" />
          </linearGradient>
          <radialGradient id={`${uniqueId}-orangeInner`} cx="0.3" cy="0.3" r="0.7">
            <stop stopColor="#FFCC80" />
            <stop offset="1" stopColor="#FF9800" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    ),
    lemon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="32" cy="34" rx="22" ry="18" fill={`url(#${uniqueId}-lemonGrad)`} />
        <ellipse cx="32" cy="34" rx="18" ry="14" fill={`url(#${uniqueId}-lemonInner)`} opacity="0.4" />
        <path d="M10 34C10 34 8 32 10 28" stroke="#FDD835" strokeWidth="2" strokeLinecap="round" />
        <path d="M54 34C54 34 56 32 54 28" stroke="#FDD835" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="32" cy="14" rx="4" ry="2" fill="#8BC34A" />
        <circle cx="26" cy="30" r="2" fill="rgba(255,255,255,0.4)" />
        <defs>
          <linearGradient id={`${uniqueId}-lemonGrad`} x1="10" y1="16" x2="54" y2="52" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF59D" />
            <stop offset="1" stopColor="#FFEB3B" />
          </linearGradient>
          <radialGradient id={`${uniqueId}-lemonInner`} cx="0.3" cy="0.3" r="0.7">
            <stop stopColor="#FFFDE7" />
            <stop offset="1" stopColor="#FFEB3B" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    ),
    strawberry: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 56C20 56 12 44 12 32C12 20 20 12 32 12C44 12 52 20 52 32C52 44 44 56 32 56Z" fill={`url(#${uniqueId}-strawberryGrad)`} />
        <ellipse cx="32" cy="10" rx="10" ry="4" fill="#66BB6A" />
        <path d="M22 8L26 14M32 6V14M42 8L38 14" stroke="#43A047" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="28" r="2" fill="#FFEB3B" />
        <circle cx="32" cy="36" r="2" fill="#FFEB3B" />
        <circle cx="40" cy="28" r="2" fill="#FFEB3B" />
        <circle cx="28" cy="44" r="2" fill="#FFEB3B" />
        <circle cx="36" cy="44" r="2" fill="#FFEB3B" />
        <circle cx="32" cy="24" r="2" fill="#FFEB3B" />
        <defs>
          <linearGradient id={`${uniqueId}-strawberryGrad`} x1="12" y1="12" x2="52" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF5252" />
            <stop offset="1" stopColor="#D32F2F" />
          </linearGradient>
        </defs>
      </svg>
    ),
    blueberry: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="36" r="22" fill={`url(#${uniqueId}-blueberryGrad)`} />
        <circle cx="32" cy="14" r="3" fill="#3F51B5" />
        <path d="M28 14H36" stroke="#303F9F" strokeWidth="2" />
        <circle cx="28" cy="32" r="2" fill="rgba(255,255,255,0.3)" />
        <circle cx="36" cy="28" r="1.5" fill="rgba(255,255,255,0.2)" />
        <defs>
          <linearGradient id={`${uniqueId}-blueberryGrad`} x1="10" y1="14" x2="54" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7C4DFF" />
            <stop offset="1" stopColor="#3F51B5" />
          </linearGradient>
        </defs>
      </svg>
    ),
    mango: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="32" cy="36" rx="20" ry="24" fill={`url(#${uniqueId}-mangoGrad)`} />
        <path d="M32 12C32 12 28 8 32 4" stroke="#66BB6A" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="32" cy="6" rx="4" ry="2" fill="#81C784" />
        <ellipse cx="26" cy="30" rx="4" ry="6" fill="rgba(255,255,255,0.2)" />
        <defs>
          <linearGradient id={`${uniqueId}-mangoGrad`} x1="12" y1="12" x2="52" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD54F" />
            <stop offset="0.5" stopColor="#FFCA28" />
            <stop offset="1" stopColor="#FF9800" />
          </linearGradient>
        </defs>
      </svg>
    ),
    pineapple: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="32" cy="40" rx="16" ry="20" fill={`url(#${uniqueId}-pineappleGrad)`} />
        <path d="M20 42L44 38M20 48L44 44M20 36L44 32" stroke="#F57C00" strokeWidth="1" opacity="0.5" />
        <path d="M24 40L24 54M32 38V56M40 40V54" stroke="#F57C00" strokeWidth="1" opacity="0.5" />
        <path d="M32 20L28 8M32 20L36 8M32 20L24 12M32 20L40 12M32 20V24" stroke="#66BB6A" strokeWidth="2" strokeLinecap="round" />
        <defs>
          <linearGradient id={`${uniqueId}-pineappleGrad`} x1="16" y1="20" x2="48" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD54F" />
            <stop offset="1" stopColor="#FFA000" />
          </linearGradient>
        </defs>
      </svg>
    ),
    grape: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="28" r="8" fill={`url(#${uniqueId}-grapeGrad)`} />
        <circle cx="40" cy="28" r="8" fill={`url(#${uniqueId}-grapeGrad)`} />
        <circle cx="32" cy="24" r="8" fill={`url(#${uniqueId}-grapeGrad)`} />
        <circle cx="20" cy="40" r="8" fill={`url(#${uniqueId}-grapeGrad)`} />
        <circle cx="32" cy="38" r="8" fill={`url(#${uniqueId}-grapeGrad)`} />
        <circle cx="44" cy="40" r="8" fill={`url(#${uniqueId}-grapeGrad)`} />
        <circle cx="32" cy="50" r="8" fill={`url(#${uniqueId}-grapeGrad)`} />
        <path d="M32 16V8L36 4" stroke="#8BC34A" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="38" cy="6" rx="4" ry="2" fill="#66BB6A" />
        <defs>
          <linearGradient id={`${uniqueId}-grapeGrad`} x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9C27B0" />
            <stop offset="1" stopColor="#6A1B9A" />
          </linearGradient>
        </defs>
      </svg>
    ),
    kiwi: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="32" cy="32" rx="22" ry="20" fill="#8D6E63" />
        <ellipse cx="32" cy="32" rx="18" ry="16" fill="#8BC34A" />
        <ellipse cx="32" cy="32" rx="4" ry="3" fill="#DCEDC8" />
        <line x1="32" y1="29" x2="32" y2="16" stroke="#33691E" strokeWidth="1" />
        <line x1="32" y1="35" x2="32" y2="48" stroke="#33691E" strokeWidth="1" />
        <line x1="29" y1="32" x2="16" y2="32" stroke="#33691E" strokeWidth="1" />
        <line x1="35" y1="32" x2="48" y2="32" stroke="#33691E" strokeWidth="1" />
        <line x1="29" y1="29" x2="20" y2="20" stroke="#33691E" strokeWidth="1" />
        <line x1="35" y1="29" x2="44" y2="20" stroke="#33691E" strokeWidth="1" />
        <line x1="29" y1="35" x2="20" y2="44" stroke="#33691E" strokeWidth="1" />
        <line x1="35" y1="35" x2="44" y2="44" stroke="#33691E" strokeWidth="1" />
        <circle cx="22" cy="26" r="1.5" fill="#1B5E20" />
        <circle cx="42" cy="26" r="1.5" fill="#1B5E20" />
        <circle cx="26" cy="40" r="1.5" fill="#1B5E20" />
        <circle cx="38" cy="40" r="1.5" fill="#1B5E20" />
      </svg>
    ),
    apple: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 56C18 56 10 44 10 32C10 20 18 14 24 14C28 14 30 16 32 16C34 16 36 14 40 14C46 14 54 20 54 32C54 44 46 56 32 56Z" fill={`url(#${uniqueId}-appleGrad)`} />
        <path d="M32 14V6" stroke="#795548" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="38" cy="8" rx="6" ry="4" fill="#66BB6A" />
        <ellipse cx="22" cy="28" rx="4" ry="6" fill="rgba(255,255,255,0.2)" />
        <defs>
          <linearGradient id={`${uniqueId}-appleGrad`} x1="10" y1="14" x2="54" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F44336" />
            <stop offset="1" stopColor="#C62828" />
          </linearGradient>
        </defs>
      </svg>
    ),
    peach: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="36" r="22" fill={`url(#${uniqueId}-peachGrad)`} />
        <path d="M32 14C32 14 30 18 32 22" stroke="#FFAB91" strokeWidth="4" strokeLinecap="round" />
        <path d="M32 14V8" stroke="#795548" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="36" cy="10" rx="5" ry="3" fill="#81C784" />
        <ellipse cx="26" cy="30" rx="4" ry="6" fill="rgba(255,255,255,0.25)" />
        <defs>
          <linearGradient id={`${uniqueId}-peachGrad`} x1="10" y1="14" x2="54" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFCCBC" />
            <stop offset="0.5" stopColor="#FFAB91" />
            <stop offset="1" stopColor="#FF8A65" />
          </linearGradient>
        </defs>
      </svg>
    ),
    carrot: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 58L18 24C18 24 22 16 32 16C42 16 46 24 46 24L32 58Z" fill={`url(#${uniqueId}-carrotGrad)`} />
        <path d="M24 28L40 24M26 36L38 32M28 44L36 40" stroke="#E65100" strokeWidth="1" opacity="0.4" />
        <path d="M28 16C28 16 26 8 30 6M32 16V4M36 16C36 16 38 8 34 6" stroke="#66BB6A" strokeWidth="2" strokeLinecap="round" />
        <defs>
          <linearGradient id={`${uniqueId}-carrotGrad`} x1="18" y1="16" x2="46" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF9800" />
            <stop offset="1" stopColor="#E65100" />
          </linearGradient>
        </defs>
      </svg>
    ),
    cucumber: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="32" cy="32" rx="12" ry="26" fill={`url(#${uniqueId}-cucumberGrad)`} />
        <ellipse cx="32" cy="32" rx="8" ry="22" fill={`url(#${uniqueId}-cucumberInner)`} opacity="0.3" />
        <circle cx="32" cy="14" r="2" fill="#2E7D32" opacity="0.5" />
        <circle cx="32" cy="50" r="2" fill="#2E7D32" opacity="0.5" />
        <defs>
          <linearGradient id={`${uniqueId}-cucumberGrad`} x1="20" y1="6" x2="44" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#81C784" />
            <stop offset="1" stopColor="#4CAF50" />
          </linearGradient>
          <radialGradient id={`${uniqueId}-cucumberInner`} cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="#C8E6C9" />
            <stop offset="1" stopColor="#4CAF50" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    ),
    mint: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="36" rx="12" ry="16" fill={`url(#${uniqueId}-mintGrad)`} transform="rotate(-15 24 36)" />
        <ellipse cx="40" cy="36" rx="12" ry="16" fill={`url(#${uniqueId}-mintGrad)`} transform="rotate(15 40 36)" />
        <ellipse cx="32" cy="28" rx="10" ry="14" fill={`url(#${uniqueId}-mintGrad)`} />
        <path d="M32 42V56" stroke="#00695C" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 38L20 44M40 38L44 44" stroke="#00695C" strokeWidth="1" />
        <path d="M32 28L32 18" stroke="#4DB6AC" strokeWidth="2" />
        <path d="M24 32L18 28M40 32L46 28" stroke="#4DB6AC" strokeWidth="1.5" />
        <defs>
          <linearGradient id={`${uniqueId}-mintGrad`} x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
            <stop stopColor="#80CBC4" />
            <stop offset="1" stopColor="#26A69A" />
          </linearGradient>
        </defs>
      </svg>
    ),
    honey: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="24" width="32" height="32" rx="4" fill={`url(#${uniqueId}-honeyJarGrad)`} />
        <rect x="20" y="28" width="24" height="24" rx="2" fill={`url(#${uniqueId}-honeyGrad)`} />
        <rect x="14" y="18" width="36" height="8" rx="2" fill="#795548" />
        <rect x="18" y="14" width="28" height="6" rx="1" fill="#8D6E63" />
        <ellipse cx="32" cy="40" rx="8" ry="6" fill="rgba(255,255,255,0.2)" />
        <defs>
          <linearGradient id={`${uniqueId}-honeyJarGrad`} x1="16" y1="24" x2="48" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFECB3" />
            <stop offset="1" stopColor="#FFE082" />
          </linearGradient>
          <linearGradient id={`${uniqueId}-honeyGrad`} x1="20" y1="28" x2="44" y2="52" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFB300" />
            <stop offset="1" stopColor="#FF8F00" />
          </linearGradient>
        </defs>
      </svg>
    ),
  };

  return fruitSvgs[fruit] || fruitSvgs.orange;
};

const FruitIcon = ({ fruit, size = 48, className = '', animate = false }) => {
  const uniqueId = useId();
  const svgContent = getFruitSvg(fruit, uniqueId);

  const Wrapper = animate ? motion.div : 'div';
  const animationProps = animate ? {
    whileHover: { scale: 1.1, rotate: 5 },
    whileTap: { scale: 0.95 },
  } : {};

  return (
    <Wrapper
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      {...animationProps}
    >
      <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full">
        {svgContent}
      </div>
    </Wrapper>
  );
};

export default FruitIcon;
