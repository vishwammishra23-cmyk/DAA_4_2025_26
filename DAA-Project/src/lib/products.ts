import type { Product } from "./sorting";

const NAMES = [
  "Aurora Headphones", "Nimbus Speaker", "Echo Smartwatch", "Pulse Earbuds",
  "Helix Keyboard", "Vortex Mouse", "Lumen Lamp", "Quartz Charger",
  "Nova Camera", "Orbit Drone", "Apex Backpack", "Drift Sunglasses",
  "Forge Wallet", "Ember Bottle", "Cipher Notebook", "Zenith Sneakers",
  "Mirage Hoodie", "Strato Jacket", "Glide Skateboard", "Halo Ring",
  "Crest Helmet", "Fable Tablet",
];

// Deterministic pseudo-random so the catalog is consistent on reload
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateProducts(): Product[] {
  const rand = mulberry32(42);
  return NAMES.map((name, i) => {
    const hue = Math.floor(rand() * 360);
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='hsl(${hue},75%,65%)'/>
        <stop offset='100%' stop-color='hsl(${(hue + 50) % 360},75%,55%)'/>
      </linearGradient></defs>
      <rect width='400' height='400' fill='url(#g)'/>
      <text x='50%' y='52%' font-family='system-ui' font-size='42' font-weight='700'
        fill='white' text-anchor='middle' opacity='0.95'>${name.split(" ")[0]}</text>
    </svg>`;
    return {
      id: i + 1,
      name,
      price: Math.round((10 + rand() * 490) * 100) / 100,
      rating: Math.round((1 + rand() * 4) * 10) / 10,
      popularity: Math.floor(rand() * 1000),
      image: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
      addedIndex: i,
    };
  });
}
