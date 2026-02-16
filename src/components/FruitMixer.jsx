import { useState, useRef, useMemo, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Sparkles,
  Droplets,
  Leaf,
  GripVertical,
  Check,
  Zap,
  Snowflake,
  Milk,
  GlassWater,
  ChevronDown,
  SlidersHorizontal,
} from 'lucide-react';
import useStore, { FRUITS, SIZES, LIQUIDS } from '../store/useStore';
import FruitIcon from './FruitIcon';

// ─── Bottle SVG Configs per Size ─────────────────────────────────────────────

const BOTTLE_CONFIGS = {
  small: {
    viewBox: '0 0 100 190',
    bodyPath:
      'M34 48 Q24 56 24 68 L24 158 Q24 170 36 170 L64 170 Q76 170 76 158 L76 68 Q76 56 66 48',
    clipPath:
      'M34 48 Q24 56 24 68 L24 158 Q24 170 36 170 L64 170 Q76 170 76 158 L76 68 Q76 56 66 48 L64 48 L64 30 Q64 24 58 24 L42 24 Q36 24 36 30 L36 48 Z',
    neckPath: 'M36 20 L36 48 L64 48 L64 20',
    cap: { x: 39, y: 4, w: 22, h: 14, rx: 3 },
    capInner1: { x: 41, y: 7, w: 18, h: 4, rx: 2 },
    capInner2: { x: 41, y: 13, w: 18, h: 2 },
    liquid: { x: 24, y: 68, w: 52, h: 102 },
    bottom: 170,
    height: 102,
    center: 50,
    glassHighlight:
      'M29 68 L29 158 Q29 164 33 164 L38 164 L38 68 Q38 62 36 56 L33 56 Q29 60 29 68',
    glassRight:
      'M71 68 L71 158 Q71 164 68 164 L66 164 L66 68 Q66 62 67 56 L69 56 Q71 60 71 68',
    containerClass: 'w-28 sm:w-32 md:w-36',
    label: '250ml',
  },
  medium: {
    viewBox: '0 0 120 220',
    bodyPath:
      'M30 50 Q18 60 18 75 L18 195 Q18 210 35 210 L85 210 Q102 210 102 195 L102 75 Q102 60 90 50',
    clipPath:
      'M30 50 Q18 60 18 75 L18 195 Q18 210 35 210 L85 210 Q102 210 102 195 L102 75 Q102 60 90 50 L85 50 L85 28 Q85 22 78 22 L42 22 Q35 22 35 28 L35 50 Z',
    neckPath: 'M35 18 L35 50 L85 50 L85 18',
    cap: { x: 42, y: 2, w: 36, h: 16, rx: 4 },
    capInner1: { x: 45, y: 5, w: 30, h: 5, rx: 2 },
    capInner2: { x: 45, y: 12, w: 30, h: 3 },
    liquid: { x: 18, y: 75, w: 84, h: 135 },
    bottom: 210,
    height: 135,
    center: 60,
    glassHighlight:
      'M24 75 L24 195 Q24 202 30 202 L38 202 L38 75 Q38 68 34 60 L30 60 Q24 65 24 75',
    glassRight:
      'M96 75 L96 195 Q96 202 92 202 L88 202 L88 75 Q88 68 90 60 L92 60 Q96 65 96 75',
    containerClass: 'w-32 sm:w-40 md:w-48',
    label: '500ml',
  },
  large: {
    viewBox: '0 0 140 260',
    bodyPath:
      'M32 55 Q18 65 18 82 L18 228 Q18 246 36 246 L104 246 Q122 246 122 228 L122 82 Q122 65 108 55',
    clipPath:
      'M32 55 Q18 65 18 82 L18 228 Q18 246 36 246 L104 246 Q122 246 122 228 L122 82 Q122 65 108 55 L104 55 L104 32 Q104 25 96 25 L44 25 Q36 25 36 32 L36 55 Z',
    neckPath: 'M36 20 L36 55 L104 55 L104 20',
    cap: { x: 42, y: 2, w: 56, h: 18, rx: 4 },
    capInner1: { x: 46, y: 5, w: 48, h: 6, rx: 3 },
    capInner2: { x: 46, y: 13, w: 48, h: 3 },
    liquid: { x: 18, y: 82, w: 104, h: 164 },
    bottom: 246,
    height: 164,
    center: 70,
    glassHighlight:
      'M24 82 L24 228 Q24 238 30 238 L40 238 L40 82 Q40 72 36 64 L30 64 Q24 70 24 82',
    glassRight:
      'M116 82 L116 228 Q116 238 112 238 L108 238 L108 82 Q108 72 110 64 L112 64 Q116 70 116 82',
    containerClass: 'w-36 sm:w-44 md:w-56',
    label: '1L',
  },
};

// ─── Fill Level Calculation ──────────────────────────────────────────────────

function computeFillLevel(fruitCount, maxFruits) {
  const baseFill = fruitCount > 0 ? 0.25 : 0.08;
  const fruitFill = Math.min(
    Math.pow(fruitCount / maxFruits, 0.7) * 0.75,
    0.75
  );
  return baseFill + fruitFill;
}

// ─── Compact Fruit Card (Mobile) ────────────────────────────────────────────

const CompactFruitCard = ({ fruit, onAdd }) => {
  const { t } = useTranslation();
  return (
    <motion.button
      onClick={() => onAdd(fruit.id)}
      className="flex flex-col items-center p-3 rounded-2xl bg-white/90 backdrop-blur-sm shadow-md border border-white/60 active:scale-95 transition-transform min-w-[76px] w-[76px]"
      whileTap={{ scale: 0.92 }}
    >
      <div className="relative mb-1.5 w-10 h-10 flex items-center justify-center">
        <div
          className="absolute inset-0 blur-lg opacity-40 rounded-full"
          style={{ backgroundColor: fruit.color }}
        />
        <div className="relative z-10">
          <FruitIcon fruit={fruit.id} size={40} />
        </div>
      </div>
      <span className="text-xs font-medium text-gray-700 truncate w-full text-center leading-tight">
        {t(`fruits.${fruit.id}`)}
      </span>
      <span className="text-xs font-bold mt-0.5" style={{ color: fruit.color }}>
        {fruit.price} DH
      </span>
    </motion.button>
  );
};

// ─── Draggable Fruit Card (Desktop) ─────────────────────────────────────────

const DraggableFruitCard = ({ fruit, onDragEnd, onAdd, onDragStart }) => {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      className="relative group cursor-grab active:cursor-grabbing"
      drag
      dragSnapToOrigin
      dragElastic={0.3}
      onDragStart={() => {
        setIsDragging(true);
        onDragStart?.();
      }}
      onDragEnd={(_, info) => {
        setIsDragging(false);
        onDragEnd(fruit, info);
      }}
      whileDrag={{ scale: 1.15, zIndex: 50 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <div
        className={`relative p-3 rounded-xl transition-all duration-300 ${
          isDragging
            ? 'bg-white shadow-2xl ring-2 ring-primary'
            : 'bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border border-white/50'
        }`}
      >
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${fruit.colorLight}30 0%, transparent 100%)`,
          }}
        />
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-40 transition-opacity">
          <GripVertical className="w-3 h-3 text-gray-400" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            className="mb-2 relative w-11 h-11 flex items-center justify-center"
            animate={isDragging ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 blur-xl opacity-50 rounded-full"
              style={{ backgroundColor: fruit.color }}
            />
            <div className="relative z-10">
              <FruitIcon fruit={fruit.id} size={44} animate />
            </div>
          </motion.div>
          <h3 className="font-semibold text-gray-800 text-xs mb-1">
            {t(`fruits.${fruit.id}`)}
          </h3>
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold" style={{ color: fruit.color }}>
              {fruit.price}
            </span>
            <span className="text-[10px] text-gray-500">DH</span>
          </div>
        </div>
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onAdd(fruit.id);
          }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ backgroundColor: fruit.color }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-3.5 h-3.5 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// ─── Premium Bottle Visualization ────────────────────────────────────────────

const BottleVisualization = ({
  fruits,
  color,
  liquidColor,
  isDropTarget,
  hasIce,
  selectedSize,
  isBlending,
  splashEffect,
  maxFruits,
}) => {
  const gradId = useId();
  const config = BOTTLE_CONFIGS[selectedSize] || BOTTLE_CONFIGS.medium;
  const fillLevel = computeFillLevel(fruits.length, maxFruits);
  const blendedColor = fruits.length > 0 ? color : liquidColor;
  const liquidY = config.bottom - fillLevel * config.height;

  // Wave paths
  const waveW = config.liquid.w;
  const waveX = config.liquid.x;
  const waveAmp = fruits.length > 0 ? 4 : 2;

  const wavePath1 = `M${waveX} ${liquidY}
    Q${waveX + waveW * 0.25} ${liquidY - waveAmp} ${waveX + waveW * 0.5} ${liquidY}
    Q${waveX + waveW * 0.75} ${liquidY + waveAmp} ${waveX + waveW} ${liquidY}
    L${waveX + waveW} ${config.bottom}
    L${waveX} ${config.bottom} Z`;

  const wavePath2 = `M${waveX} ${liquidY}
    Q${waveX + waveW * 0.25} ${liquidY + waveAmp} ${waveX + waveW * 0.5} ${liquidY}
    Q${waveX + waveW * 0.75} ${liquidY - waveAmp} ${waveX + waveW} ${liquidY}
    L${waveX + waveW} ${config.bottom}
    L${waveX} ${config.bottom} Z`;

  // Second wave layer (offset, lighter)
  const wave2Amp = waveAmp * 0.6;
  const wave2Y = liquidY + 3;
  const wavePath2a = `M${waveX} ${wave2Y}
    Q${waveX + waveW * 0.3} ${wave2Y + wave2Amp} ${waveX + waveW * 0.5} ${wave2Y}
    Q${waveX + waveW * 0.7} ${wave2Y - wave2Amp} ${waveX + waveW} ${wave2Y}
    L${waveX + waveW} ${config.bottom}
    L${waveX} ${config.bottom} Z`;

  const wave2b = `M${waveX} ${wave2Y}
    Q${waveX + waveW * 0.3} ${wave2Y - wave2Amp} ${waveX + waveW * 0.5} ${wave2Y}
    Q${waveX + waveW * 0.7} ${wave2Y + wave2Amp} ${waveX + waveW} ${wave2Y}
    L${waveX + waveW} ${config.bottom}
    L${waveX} ${config.bottom} Z`;

  // Stable bubble positions
  const bubbles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        cx: waveX + 8 + ((i * 37 + 13) % (waveW - 16)),
        r: 1.2 + (i % 3) * 0.8,
        delay: i * 0.35,
        dur: 2.2 + (i % 3) * 0.6,
      })),
    [waveX, waveW]
  );

  // Ice cube positions relative to liquid area
  const iceY = config.bottom - config.height * 0.35;
  const iceCx = config.center;

  return (
    <div className={`relative ${config.containerClass} mx-auto`}>
      {/* Drop target overlay */}
      <AnimatePresence>
        {isDropTarget && (
          <motion.div
            className="absolute -inset-4 rounded-3xl border-3 border-dashed border-primary bg-primary/10 z-30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-primary font-bold text-sm bg-white/90 px-4 py-2 rounded-full shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Drop here!
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 aspect-square rounded-full blur-3xl"
        animate={{ backgroundColor: blendedColor, opacity: 0.3 }}
        transition={{ duration: 0.5 }}
      />

      {/* Bottle SVG */}
      <AnimatePresence mode="wait">
        <motion.svg
          key={selectedSize}
          viewBox={config.viewBox}
          className="w-full h-auto relative z-10"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <defs>
            <linearGradient
              id={`liq-${gradId}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <motion.stop
                offset="0%"
                animate={{ stopColor: blendedColor }}
                transition={{ duration: 0.3 }}
              />
              <motion.stop
                offset="100%"
                animate={{ stopColor: `${blendedColor}99` }}
                transition={{ duration: 0.3 }}
              />
            </linearGradient>

            <linearGradient
              id={`liq2-${gradId}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <motion.stop
                offset="0%"
                animate={{ stopColor: `${blendedColor}66` }}
                transition={{ duration: 0.3 }}
              />
              <motion.stop
                offset="100%"
                animate={{ stopColor: `${blendedColor}44` }}
                transition={{ duration: 0.3 }}
              />
            </linearGradient>

            <linearGradient
              id={`glass-${gradId}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
            </linearGradient>

            <radialGradient
              id={`refr-${gradId}`}
              cx="0.3"
              cy="0.15"
              r="0.8"
            >
              <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            <clipPath id={`clip-${gradId}`}>
              <path d={config.clipPath} />
            </clipPath>
          </defs>

          {/* Cap */}
          <rect
            x={config.cap.x}
            y={config.cap.y}
            width={config.cap.w}
            height={config.cap.h}
            rx={config.cap.rx}
            fill="#1a1a1a"
          />
          <rect
            x={config.capInner1.x}
            y={config.capInner1.y}
            width={config.capInner1.w}
            height={config.capInner1.h}
            rx={config.capInner1.rx}
            fill="#444"
          />
          <rect
            x={config.capInner2.x}
            y={config.capInner2.y}
            width={config.capInner2.w}
            height={config.capInner2.h}
            fill="#0a0a0a"
          />

          {/* Neck */}
          <path
            d={config.neckPath}
            fill="#f5f5f5"
            stroke="#e0e0e0"
            strokeWidth="1"
          />

          {/* Body */}
          <path
            d={config.bodyPath}
            fill="#fafafa"
            stroke="#e0e0e0"
            strokeWidth="1.5"
          />

          {/* Glass refraction overlay */}
          <path
            d={config.bodyPath}
            fill={`url(#refr-${gradId})`}
          />

          {/* Clipped liquid area */}
          <g clipPath={`url(#clip-${gradId})`}>
            {/* Second wave layer (behind, lighter) */}
            <motion.path
              d={wavePath2a}
              fill={`url(#liq2-${gradId})`}
              animate={{ d: [wavePath2a, wave2b, wavePath2a] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Primary wave liquid */}
            <motion.path
              d={wavePath1}
              fill={`url(#liq-${gradId})`}
              animate={{ d: [wavePath1, wavePath2, wavePath1] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Ice cubes */}
            {hasIce &&
              [
                { dx: -18, dy: 0 },
                { dx: 12, dy: 5 },
                { dx: -5, dy: 22 },
                { dx: 16, dy: 28 },
              ].map((pos, i) => (
                <motion.rect
                  key={`ice-${i}`}
                  x={iceCx + pos.dx}
                  y={iceY + pos.dy}
                  width={14}
                  height={12}
                  rx={3}
                  fill="rgba(255,255,255,0.65)"
                  stroke="rgba(200,220,255,0.4)"
                  strokeWidth="0.8"
                  animate={{
                    y: [
                      iceY + pos.dy,
                      iceY + pos.dy - 4,
                      iceY + pos.dy,
                    ],
                    rotate: [0, i % 2 === 0 ? 5 : -5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}

            {/* Bubbles */}
            {bubbles.map((b, i) => (
              <motion.circle
                key={i}
                cx={b.cx}
                r={b.r}
                fill="rgba(255,255,255,0.55)"
                animate={{
                  cy: [config.bottom - 5, liquidY + 10, config.bottom - 5],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: b.dur,
                  repeat: Infinity,
                  delay: b.delay,
                }}
              />
            ))}

            {/* Blend swirl effect */}
            <AnimatePresence>
              {isBlending && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.ellipse
                    cx={config.center}
                    cy={config.bottom - config.height * 0.4}
                    rx={waveW * 0.3}
                    ry={6}
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 0.6, repeat: 2 }}
                    style={{
                      transformOrigin: `${config.center}px ${config.bottom - config.height * 0.4}px`,
                    }}
                  />
                  <motion.ellipse
                    cx={config.center}
                    cy={config.bottom - config.height * 0.55}
                    rx={waveW * 0.2}
                    ry={4}
                    fill="none"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 0.8, repeat: 1 }}
                    style={{
                      transformOrigin: `${config.center}px ${config.bottom - config.height * 0.55}px`,
                    }}
                  />
                </motion.g>
              )}
            </AnimatePresence>

            {/* Splash droplets */}
            <AnimatePresence>
              {splashEffect && (
                <motion.g key={splashEffect.id}>
                  {[...Array(6)].map((_, i) => {
                    const angle = (i / 6) * Math.PI;
                    const dist = 12 + (i % 3) * 8;
                    return (
                      <motion.circle
                        key={i}
                        cx={config.center}
                        cy={liquidY}
                        r={1.5 + (i % 2)}
                        fill={splashEffect.color}
                        initial={{ x: 0, y: 0, opacity: 1 }}
                        animate={{
                          x: Math.cos(angle) * dist - Math.cos(angle) * dist * 0.2,
                          y: -(15 + i * 5),
                          opacity: 0,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    );
                  })}
                </motion.g>
              )}
            </AnimatePresence>
          </g>

          {/* Glass highlights */}
          <path d={config.glassHighlight} fill={`url(#glass-${gradId})`} />
          <path d={config.glassRight} fill="rgba(255,255,255,0.12)" />

          {/* Top specular */}
          <ellipse
            cx={config.center}
            cy={config.liquid.y + 8}
            rx={waveW * 0.2}
            ry={3}
            fill="rgba(255,255,255,0.18)"
          />

          {/* Size label on bottle */}
          <text
            x={config.center}
            y={config.bottom - 8}
            textAnchor="middle"
            fontSize="8"
            fill="rgba(0,0,0,0.12)"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            {config.label}
          </text>
        </motion.svg>
      </AnimatePresence>

      {/* Floating fruits inside bottle */}
      <AnimatePresence>
        {fruits.slice(-(Math.min(fruits.length, 5))).map((fruit, index) => {
          const fruitY =
            (liquidY / parseInt(config.viewBox.split(' ')[3])) * 100 +
            8 +
            index * 10;
          return (
            <motion.div
              key={fruit.uniqueId}
              className="absolute z-20"
              style={{ left: '50%', marginLeft: -8 }}
              initial={{ y: -20, scale: 0, rotate: -180 }}
              animate={{
                y: `${fruitY}%`,
                x: (index % 2 === 0 ? -10 : 10) + (index % 3) * 3,
                scale: 1,
                rotate: 0,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <FruitIcon fruit={fruit.id} size={16} />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-6 -left-3 hidden sm:block"
        animate={{ y: [0, -6, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Droplets className="w-4 h-4" style={{ color: blendedColor }} />
      </motion.div>
      {fruits.length > 0 && (
        <motion.div
          className="absolute bottom-12 -right-2 hidden sm:block"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </motion.div>
      )}
    </div>
  );
};

// ─── Fill Progress Bar ───────────────────────────────────────────────────────

const FillProgressBar = ({ fillLevel, color, fruitCount, maxFruits, t }) => (
  <div className="w-full mt-3">
    <div className="flex justify-between text-[10px] text-gray-500 mb-1">
      <span>
        {fruitCount}/{maxFruits} {t('mixer.fruitsLabel')}
      </span>
      <span>{Math.round(fillLevel * 100)}%</span>
    </div>
    <div className="h-2 bg-gray-200/60 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        animate={{ width: `${Math.min(fillLevel * 100, 100)}%` }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      />
    </div>
  </div>
);

// ─── Liquid Selector Button ──────────────────────────────────────────────────

const LiquidButton = ({ liquid, isSelected, onSelect, t }) => {
  const icons = { water: GlassWater, milk: Milk, orange: Droplets };
  const Icon = icons[liquid.id];
  return (
    <motion.button
      onClick={() => onSelect(liquid.id)}
      className={`relative flex-1 flex flex-col items-center gap-1 p-2.5 sm:p-3 rounded-xl transition-all ${
        isSelected
          ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary shadow-md'
          : 'bg-white/80 border-2 border-gray-100 hover:border-gray-200'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
          isSelected ? 'bg-primary/20' : 'bg-gray-100'
        }`}
        style={isSelected ? { backgroundColor: `${liquid.color}40` } : {}}
      >
        <Icon
          className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? 'text-primary' : 'text-gray-500'}`}
        />
      </div>
      <span
        className={`text-[10px] sm:text-xs font-medium ${isSelected ? 'text-primary' : 'text-gray-600'}`}
      >
        {t(`mixer.liquids.${liquid.id}`)}
      </span>
      <span
        className={`text-[10px] sm:text-xs font-bold ${isSelected ? 'text-primary' : 'text-gray-500'}`}
      >
        {liquid.price === 0 ? t('mixer.liquidFree') : `${liquid.price} DH`}
      </span>
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center"
        >
          <Check className="w-2.5 h-2.5 text-white" />
        </motion.div>
      )}
    </motion.button>
  );
};

// ─── Size Selector Button ────────────────────────────────────────────────────

const SizeButton = ({ size, isSelected, onSelect }) => (
  <motion.button
    onClick={() => onSelect(size.id)}
    className={`relative flex-1 py-3 px-2 rounded-xl transition-all duration-300 min-h-[52px] ${
      isSelected
        ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg'
        : 'bg-white hover:bg-gray-50 text-gray-700 shadow-md border border-gray-100'
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {isSelected && (
      <motion.div
        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-md"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <Check className="w-3 h-3 text-white" />
      </motion.div>
    )}
    <div className="text-center">
      <span className="block text-lg sm:text-xl font-bold">{size.label}</span>
      <span
        className={`block text-sm font-semibold ${isSelected ? 'text-white/90' : 'text-primary'}`}
      >
        {size.price} DH
      </span>
    </div>
  </motion.button>
);

// ─── Selected Fruit Pill ─────────────────────────────────────────────────────

const SelectedFruitPill = ({ fruit, onRemove }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-full shadow-sm border border-gray-100 flex-shrink-0"
    >
      <FruitIcon fruit={fruit.id} size={16} />
      <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
        {t(`fruits.${fruit.id}`)}
      </span>
      <motion.button
        onClick={() => onRemove(fruit.uniqueId)}
        className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <Minus className="w-3 h-3 text-red-500" />
      </motion.button>
    </motion.div>
  );
};

// ─── Quick Preset Button ─────────────────────────────────────────────────────

const PresetButton = ({ name, icon: Icon, color, onClick }) => (
  <motion.button
    onClick={onClick}
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
  >
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center"
      style={{ backgroundColor: `${color}20` }}
    >
      <Icon className="w-3 h-3" style={{ color }} />
    </div>
    <span className="text-xs font-medium text-gray-700">{name}</span>
  </motion.button>
);

// ═════════════════════════════════════════════════════════════════════════════
// Main FruitMixer Component
// ═════════════════════════════════════════════════════════════════════════════

const FruitMixer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDropTarget, setIsDropTarget] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isBlending, setIsBlending] = useState(false);
  const [splashEffect, setSplashEffect] = useState(null);
  const [optionsExpanded, setOptionsExpanded] = useState(false);
  const bottleRef = useRef(null);

  const {
    selectedFruits,
    selectedSize,
    selectedLiquid,
    addIce,
    addFruit,
    removeFruit,
    setSize,
    setLiquid,
    toggleIce,
    clearMixer,
    calculateTotal,
    getMixedColor,
    loadPreset,
  } = useStore();

  const pricing = calculateTotal();
  const mixedColor = getMixedColor();
  const currentSize = SIZES.find((s) => s.id === selectedSize);
  const currentLiquid = LIQUIDS.find((l) => l.id === selectedLiquid);
  const maxFruits = currentSize?.maxFruits || 8;
  const fillLevel = computeFillLevel(selectedFruits.length, maxFruits);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 2000);
  };

  const handleAddFruit = (fruitId) => {
    const result = addFruit(fruitId);
    if (result.success) {
      setIsBlending(true);
      setTimeout(() => setIsBlending(false), 1200);
      const fruitData = FRUITS.find((f) => f.id === fruitId);
      if (fruitData) {
        setSplashEffect({ id: Date.now(), color: fruitData.color });
        setTimeout(() => setSplashEffect(null), 700);
      }
    }
    showNotification(
      result.success ? 'success' : 'error',
      t(`mixer.${result.message}`)
    );
  };

  const handleDragStart = () => setIsDropTarget(true);

  const handleDragEnd = (fruit, info) => {
    if (bottleRef.current) {
      const bottleRect = bottleRef.current.getBoundingClientRect();
      const padding = 60;
      if (
        info.point.x >= bottleRect.left - padding &&
        info.point.x <= bottleRect.right + padding &&
        info.point.y >= bottleRect.top - padding &&
        info.point.y <= bottleRect.bottom + padding
      ) {
        handleAddFruit(fruit.id);
      }
    }
    setIsDropTarget(false);
  };

  const handleCheckout = () => {
    if (selectedFruits.length > 0) navigate('/checkout');
  };

  // ─── Shared sub-sections ────────────────────────────────────────────────

  const renderSelectedPills = (wrapClass = '') => (
    selectedFruits.length > 0 && (
      <div className={`flex gap-1.5 overflow-x-auto scrollbar-hide ${wrapClass}`}>
        <AnimatePresence mode="popLayout">
          {selectedFruits.map((fruit) => (
            <SelectedFruitPill
              key={fruit.uniqueId}
              fruit={fruit}
              onRemove={removeFruit}
            />
          ))}
        </AnimatePresence>
      </div>
    )
  );

  const renderLiquidIce = () => (
    <>
      <h4 className="text-xs font-bold text-gray-700 mb-2">{t('mixer.liquid')}</h4>
      <div className="flex gap-2 mb-3">
        {LIQUIDS.map((liquid) => (
          <LiquidButton
            key={liquid.id}
            liquid={liquid}
            isSelected={selectedLiquid === liquid.id}
            onSelect={setLiquid}
            t={t}
          />
        ))}
      </div>
      <motion.button
        onClick={toggleIce}
        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
          addIce
            ? 'bg-blue-50 border-2 border-blue-400'
            : 'bg-gray-50 border-2 border-gray-200'
        }`}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              addIce ? 'bg-blue-100' : 'bg-gray-200'
            }`}
          >
            <Snowflake
              className={`w-4 h-4 ${addIce ? 'text-blue-500' : 'text-gray-400'}`}
            />
          </div>
          <span
            className={`text-sm font-medium ${addIce ? 'text-blue-700' : 'text-gray-600'}`}
          >
            {t('mixer.ice')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-bold ${addIce ? 'text-blue-600' : 'text-gray-500'}`}
          >
            {t('mixer.icePrice')}
          </span>
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${
              addIce ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            {addIce && <Check className="w-3 h-3 text-white" />}
          </div>
        </div>
      </motion.button>
    </>
  );

  const renderSizeSelector = () => (
    <div>
      <h4 className="text-xs font-bold text-gray-700 mb-2">{t('mixer.size')}</h4>
      <div className="flex gap-2">
        {SIZES.map((size) => (
          <SizeButton
            key={size.id}
            size={size}
            isSelected={selectedSize === size.id}
            onSelect={setSize}
          />
        ))}
      </div>
    </div>
  );

  const renderOrderSummary = (compact = false) => (
    <div className={compact ? 'space-y-1.5' : 'space-y-2'}>
      <div className={`flex justify-between ${compact ? 'text-xs' : 'text-sm'}`}>
        <span className="text-gray-600">
          {t('mixer.fruitsTotal')} ({selectedFruits.length})
        </span>
        <span className="font-semibold">{pricing.fruitsTotal} DH</span>
      </div>
      <div className={`flex justify-between ${compact ? 'text-xs' : 'text-sm'}`}>
        <span className="text-gray-600">
          {t('mixer.bottleFee')} ({currentSize.label})
        </span>
        <span className="font-semibold">{pricing.bottlePrice} DH</span>
      </div>
      {pricing.liquidPrice > 0 && (
        <div className={`flex justify-between ${compact ? 'text-xs' : 'text-sm'}`}>
          <span className="text-gray-600">
            {t('mixer.liquidFee')} ({t(`mixer.liquids.${selectedLiquid}`)})
          </span>
          <span className="font-semibold">{pricing.liquidPrice} DH</span>
        </div>
      )}
      {pricing.icePrice > 0 && (
        <div className={`flex justify-between ${compact ? 'text-xs' : 'text-sm'}`}>
          <span className="text-gray-600">{t('mixer.iceFee')}</span>
          <span className="font-semibold">{pricing.icePrice} DH</span>
        </div>
      )}
      <div className="border-t border-gray-200 pt-2 flex justify-between">
        <span className={`${compact ? 'text-base' : 'text-lg'} font-bold text-gray-900`}>
          {t('mixer.total')}
        </span>
        <motion.span
          className={`${compact ? 'text-xl' : 'text-2xl'} font-bold text-primary`}
          key={pricing.total}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
        >
          {pricing.total} DH
        </motion.span>
      </div>
    </div>
  );

  const renderCheckoutButton = (fullWidth = true) => (
    <motion.button
      onClick={handleCheckout}
      disabled={selectedFruits.length === 0}
      className={`${fullWidth ? 'w-full' : ''} py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
        selectedFruits.length > 0
          ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-xl hover:shadow-2xl'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
      }`}
      whileHover={selectedFruits.length > 0 ? { scale: 1.02 } : {}}
      whileTap={selectedFruits.length > 0 ? { scale: 0.98 } : {}}
    >
      <ShoppingCart className="w-5 h-5" />
      {t('mixer.checkout')}
      {selectedFruits.length > 0 && (
        <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
          {pricing.total} DH
        </span>
      )}
    </motion.button>
  );

  const renderTrustBadges = () => (
    <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
      <div className="flex items-center gap-1">
        <Check className="w-4 h-4 text-green-500" />
        {t('mixer.badges.fresh')}
      </div>
      <div className="flex items-center gap-1">
        <Check className="w-4 h-4 text-green-500" />
        {t('mixer.badges.noSugar')}
      </div>
      <div className="flex items-center gap-1 hidden sm:flex">
        <Check className="w-4 h-4 text-green-500" />
        {t('mixer.badges.sameDay')}
      </div>
    </div>
  );

  // ─── Shared Bottle Block ────────────────────────────────────────────────

  const renderBottle = (refProp) => (
    <motion.div
      animate={isBlending ? { scale: [1, 1.03, 1] } : {}}
      transition={{ duration: 0.4 }}
    >
      <BottleVisualization
        fruits={selectedFruits}
        color={mixedColor}
        liquidColor={currentLiquid?.color || '#87CEEB'}
        isDropTarget={isDropTarget}
        hasIce={addIce}
        selectedSize={selectedSize}
        isBlending={isBlending}
        splashEffect={splashEffect}
        maxFruits={maxFruits}
      />
    </motion.div>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <section className="min-h-screen py-6 md:py-12 bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-md mb-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-gray-600">
              {t('mixer.dragOrTap')}
            </span>
          </motion.div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-2">
            {t('mixer.title')}
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            {t('mixer.subtitle')}
          </p>
        </motion.div>

        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -20, x: '-50%' }}
              className={`fixed top-20 left-1/2 z-50 px-4 py-2 rounded-xl shadow-xl ${
                notification.type === 'success'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              <div className="flex items-center gap-2 text-sm">
                {notification.type === 'success' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Minus className="w-4 h-4" />
                )}
                {notification.message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick presets */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <PresetButton
            name={t('mixer.presets.tropical')}
            icon={Sparkles}
            color="#FF9500"
            onClick={() => loadPreset('tropical')}
          />
          <PresetButton
            name={t('mixer.presets.berry')}
            icon={Droplets}
            color="#EC4899"
            onClick={() => loadPreset('berry')}
          />
          <PresetButton
            name={t('mixer.presets.green')}
            icon={Leaf}
            color="#22C55E"
            onClick={() => loadPreset('green')}
          />
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════
            MOBILE LAYOUT
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="lg:hidden pb-28">
          {/* Full-width Bottle */}
          <motion.div
            ref={bottleRef}
            className="mb-4 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {renderBottle()}

            {/* Fill progress */}
            <div className="w-48 sm:w-56">
              <FillProgressBar
                fillLevel={fillLevel}
                color={mixedColor}
                fruitCount={selectedFruits.length}
                maxFruits={maxFruits}
                t={t}
              />
            </div>

            {/* Count + Clear */}
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-gray-500">
                {t('mixer.yourMix')} ({selectedFruits.length}/{maxFruits})
              </span>
              {selectedFruits.length > 0 && (
                <button
                  onClick={clearMixer}
                  className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  {t('mixer.clear')}
                </button>
              )}
            </div>
          </motion.div>

          {/* Selected Fruit Pills (horizontal scroll) */}
          <div className="mb-4 px-3">{renderSelectedPills()}</div>

          {/* Horizontal Scrollable Fruit Strip */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-xs font-bold text-gray-700 mb-2 px-4 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-primary" />
              {t('mixer.freshIngredients')}
            </h3>
            <div className="flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide snap-x snap-mandatory">
              {FRUITS.map((fruit) => (
                <div key={fruit.id} className="snap-start flex-shrink-0">
                  <CompactFruitCard fruit={fruit} onAdd={handleAddFruit} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Collapsible Options (Liquid, Ice, Size) */}
          <div className="px-3 mb-4">
            <motion.button
              onClick={() => setOptionsExpanded(!optionsExpanded)}
              className="w-full flex items-center justify-between p-3.5 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-white/60"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-bold text-gray-700">
                  {t('mixer.customizeOptions')}
                </span>
              </div>
              <motion.div
                animate={{ rotate: optionsExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {optionsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 mt-2 border border-white/80 shadow-lg space-y-4">
                    {renderLiquidIce()}
                    <div className="border-t border-gray-100 pt-3">
                      {renderSizeSelector()}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Card */}
          <motion.div
            className="mx-3 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-secondary" />
              {t('mixer.summary')}
            </h3>
            {renderOrderSummary(true)}
            <div className="mt-3 pt-3 border-t border-gray-100">
              {renderTrustBadges()}
            </div>
          </motion.div>

          {/* Sticky Bottom Checkout Bar */}
          <AnimatePresence>
            {selectedFruits.length > 0 && (
              <motion.div
                className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-40 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs text-gray-500">{t('mixer.total')}</span>
                    <motion.span
                      className="text-xl font-bold text-primary"
                      key={pricing.total}
                      initial={{ scale: 1.15 }}
                      animate={{ scale: 1 }}
                    >
                      {pricing.total} DH
                    </motion.span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {selectedFruits.length}/{maxFruits}
                  </span>
                </div>
                <motion.button
                  onClick={handleCheckout}
                  className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg"
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {t('mixer.checkout')}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            DESKTOP LAYOUT
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6">
          {/* Left - Fruit Grid */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-5 border border-white/80 shadow-xl">
              <h3 className="text-lg font-heading font-bold mb-3 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                </div>
                {t('mixer.freshIngredients')}
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                {t('mixer.dragOrTap')}
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {FRUITS.map((fruit) => (
                  <DraggableFruitCard
                    key={fruit.id}
                    fruit={fruit}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onAdd={handleAddFruit}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Center - Bottle + Options */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            ref={bottleRef}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDropTarget(true);
            }}
            onDragLeave={() => setIsDropTarget(false)}
          >
            <div className="sticky top-24 flex flex-col items-center">
              {renderBottle()}

              {/* Fill progress */}
              <div className="w-52">
                <FillProgressBar
                  fillLevel={fillLevel}
                  color={mixedColor}
                  fruitCount={selectedFruits.length}
                  maxFruits={maxFruits}
                  t={t}
                />
              </div>

              {/* Your Mix */}
              <div className="mt-4 w-full">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-600">
                    {t('mixer.yourMix')} ({selectedFruits.length}/{maxFruits})
                  </h4>
                  {selectedFruits.length > 0 && (
                    <motion.button
                      onClick={clearMixer}
                      className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {t('mixer.clear')}
                    </motion.button>
                  )}
                </div>
                {selectedFruits.length === 0 ? (
                  <p className="text-center text-gray-400 text-xs py-3">
                    {t('mixer.empty')}
                  </p>
                ) : (
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <AnimatePresence mode="popLayout">
                      {selectedFruits.map((fruit) => (
                        <SelectedFruitPill
                          key={fruit.uniqueId}
                          fruit={fruit}
                          onRemove={removeFruit}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Liquid & Ice Options */}
              <div className="w-full mt-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/80 shadow-lg">
                {renderLiquidIce()}
              </div>
            </div>
          </motion.div>

          {/* Right - Order Summary */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-5 sticky top-24 border border-gray-100">
              <h3 className="text-lg font-heading font-bold mb-5 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center">
                  <ShoppingCart className="w-3.5 h-3.5 text-secondary" />
                </div>
                {t('mixer.summary')}
              </h3>

              {/* Size Selection */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">
                  {t('mixer.size')}
                </h4>
                <div className="flex gap-2">
                  {SIZES.map((size) => (
                    <SizeButton
                      key={size.id}
                      size={size}
                      isSelected={selectedSize === size.id}
                      onSelect={setSize}
                    />
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-5">
                {renderOrderSummary()}
              </div>

              {/* Checkout */}
              {renderCheckoutButton()}

              {/* Trust Badges */}
              <div className="mt-5 pt-5 border-t border-gray-100">
                {renderTrustBadges()}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FruitMixer;
