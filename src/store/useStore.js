import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Fruit data with prices and colors - NO EMOJIS, use icon names
export const FRUITS = [
  { id: 'orange', price: 5, color: '#FF9500', colorLight: '#FFB74D' },
  { id: 'lemon', price: 3, color: '#FFE135', colorLight: '#FFF59D' },
  { id: 'strawberry', price: 8, color: '#FF4757', colorLight: '#FF8A80' },
  { id: 'blueberry', price: 10, color: '#5352ED', colorLight: '#7C4DFF' },
  { id: 'mango', price: 12, color: '#FFA502', colorLight: '#FFCA28' },
  { id: 'pineapple', price: 7, color: '#FFD93D', colorLight: '#FFF176' },
  { id: 'grape', price: 6, color: '#8E44AD', colorLight: '#BA68C8' },
  { id: 'kiwi', price: 8, color: '#7CB342', colorLight: '#AED581' },
  { id: 'apple', price: 4, color: '#E74C3C', colorLight: '#EF5350' },
  { id: 'peach', price: 9, color: '#FFAB91', colorLight: '#FFCCBC' },
  { id: 'carrot', price: 3, color: '#FF7043', colorLight: '#FFAB91' },
  { id: 'cucumber', price: 2, color: '#66BB6A', colorLight: '#A5D6A7' },
  { id: 'mint', price: 2, color: '#26A69A', colorLight: '#80CBC4' },
  { id: 'honey', price: 5, color: '#FFB300', colorLight: '#FFD54F' },
];

// Size options with fixed pricing (no multiplier - direct prices)
export const SIZES = [
  { id: 'small', ml: 250, label: '250ml', price: 5, maxFruits: 4 },
  { id: 'medium', ml: 500, label: '500ml', price: 8, maxFruits: 6 },
  { id: 'large', ml: 1000, label: '1L', price: 10, maxFruits: 8 },
];

// Mixer liquid options
export const LIQUIDS = [
  { id: 'water', price: 0, color: '#87CEEB' },
  { id: 'milk', price: 3, color: '#FFFEF0' },
  { id: 'orange', price: 5, color: '#FFA500' },
];

const MAX_FRUITS = 8;

const useStore = create(
  persist(
    (set, get) => ({
      // State
      selectedFruits: [],
      selectedSize: 'medium',
      selectedLiquid: 'water',
      addIce: false,
      language: 'en',
      orderDetails: null,
      isCheckoutComplete: false,

      // Actions
      addFruit: (fruitId) => {
        const { selectedFruits, selectedSize } = get();
        const size = SIZES.find((s) => s.id === selectedSize);
        const maxFruits = size?.maxFruits || MAX_FRUITS;
        if (selectedFruits.length >= maxFruits) {
          return { success: false, message: 'maxFruits' };
        }

        const fruit = FRUITS.find((f) => f.id === fruitId);
        if (!fruit) return { success: false };

        const newFruit = {
          ...fruit,
          uniqueId: `${fruitId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };

        set((state) => ({
          selectedFruits: [...state.selectedFruits, newFruit],
        }));

        return { success: true, message: 'addedToMix' };
      },

      removeFruit: (uniqueId) => {
        set((state) => ({
          selectedFruits: state.selectedFruits.filter((f) => f.uniqueId !== uniqueId),
        }));
        return { success: true, message: 'removedFromMix' };
      },

      setSize: (sizeId) => {
        const size = SIZES.find((s) => s.id === sizeId);
        const { selectedFruits } = get();
        if (size && selectedFruits.length > size.maxFruits) {
          set({
            selectedSize: sizeId,
            selectedFruits: selectedFruits.slice(0, size.maxFruits),
          });
        } else {
          set({ selectedSize: sizeId });
        }
      },

      setLiquid: (liquidId) => {
        set({ selectedLiquid: liquidId });
      },

      toggleIce: () => {
        set((state) => ({ addIce: !state.addIce }));
      },

      setIce: (value) => {
        set({ addIce: value });
      },

      clearMixer: () => {
        set({ selectedFruits: [], selectedSize: 'medium', selectedLiquid: 'water', addIce: false });
      },

      calculateTotal: () => {
        const { selectedFruits, selectedSize, selectedLiquid, addIce } = get();
        const size = SIZES.find((s) => s.id === selectedSize);
        const liquid = LIQUIDS.find((l) => l.id === selectedLiquid);
        const fruitsTotal = selectedFruits.reduce((sum, fruit) => sum + fruit.price, 0);
        const bottlePrice = size.price;
        const liquidPrice = liquid?.price || 0;
        const icePrice = addIce ? 1 : 0;
        const total = fruitsTotal + bottlePrice + liquidPrice + icePrice;

        return {
          fruitsTotal,
          bottlePrice,
          liquidPrice,
          icePrice,
          total,
        };
      },

      getMixedColor: () => {
        const { selectedFruits } = get();
        if (selectedFruits.length === 0) return '#FFE4C4';

        const colors = selectedFruits.map((f) => f.color);
        const rgbColors = colors.map((hex) => {
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
              }
            : { r: 255, g: 228, b: 196 };
        });

        const avgColor = rgbColors.reduce(
          (acc, color) => ({
            r: acc.r + color.r / rgbColors.length,
            g: acc.g + color.g / rgbColors.length,
            b: acc.b + color.b / rgbColors.length,
          }),
          { r: 0, g: 0, b: 0 }
        );

        const toHex = (n) =>
          Math.round(n)
            .toString(16)
            .padStart(2, '0');

        return `#${toHex(avgColor.r)}${toHex(avgColor.g)}${toHex(avgColor.b)}`;
      },

      // Language
      setLanguage: (lang) => {
        set({ language: lang });
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
      },

      // Order
      setOrderDetails: (details) => {
        set({ orderDetails: details, isCheckoutComplete: true });
      },

      resetOrder: () => {
        set({
          selectedFruits: [],
          selectedSize: 'medium',
          selectedLiquid: 'water',
          addIce: false,
          orderDetails: null,
          isCheckoutComplete: false,
        });
      },

      // Popular mixes presets
      loadPreset: (presetName) => {
        const presets = {
          tropical: ['mango', 'pineapple', 'orange'],
          berry: ['strawberry', 'blueberry', 'grape'],
          green: ['cucumber', 'apple', 'mint', 'lemon'],
        };

        const fruitIds = presets[presetName];
        if (!fruitIds) return;

        const newFruits = fruitIds.map((id) => {
          const fruit = FRUITS.find((f) => f.id === id);
          return {
            ...fruit,
            uniqueId: `${id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          };
        });

        set({ selectedFruits: newFruits });
      },
    }),
    {
      name: 'freshmix-store',
      partialize: (state) => ({
        selectedFruits: state.selectedFruits,
        selectedSize: state.selectedSize,
        selectedLiquid: state.selectedLiquid,
        addIce: state.addIce,
        language: state.language,
      }),
    }
  )
);

export default useStore;
