// Sorting logic separated from UI

export type Product = {
  id: number;
  name: string;
  price: number;
  rating: number;
  popularity: number;
  image: string;
  addedIndex: number; // original insertion order (used to demonstrate stability)
};

export type SortKey = "price-asc" | "price-desc" | "rating-desc" | "popularity-desc" | "rating-then-price";

export type SortOption = {
  key: SortKey;
  label: string;
  description: string;
};

export const SORT_OPTIONS: SortOption[] = [
  { key: "price-asc", label: "Price: Low → High", description: "Single key sort" },
  { key: "price-desc", label: "Price: High → Low", description: "Single key sort" },
  { key: "rating-desc", label: "Rating: High → Low", description: "Single key sort" },
  { key: "popularity-desc", label: "Popularity: High → Low", description: "Single key sort" },
  { key: "rating-then-price", label: "Rating, then Price ↑", description: "Multi-level sort" },
];

type Comparator = (a: Product, b: Product) => number;

const comparators: Record<SortKey, Comparator> = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "rating-desc": (a, b) => b.rating - a.rating,
  "popularity-desc": (a, b) => b.popularity - a.popularity,
  "rating-then-price": (a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return a.price - b.price;
  },
};

/**
 * Stable sort: uses Array.prototype.sort which is guaranteed stable in modern JS engines.
 * Equal elements preserve their original relative order.
 */
export function stableSort(products: Product[], key: SortKey): Product[] {
  return [...products].sort(comparators[key]);
}

/**
 * Simulated unstable sort: for equal keys we randomly swap,
 * mimicking a non-stable algorithm (e.g., classic quicksort).
 */
export function unstableSort(products: Product[], key: SortKey): Product[] {
  const cmp = comparators[key];
  return [...products].sort((a, b) => {
    const r = cmp(a, b);
    if (r === 0) return Math.random() < 0.5 ? -1 : 1;
    return r;
  });
}

export function sortProducts(products: Product[], key: SortKey, stable: boolean): Product[] {
  return stable ? stableSort(products, key) : unstableSort(products, key);
}

/**
 * Top-K using a min-heap (priority queue) — O(n log k).
 * Returns the K products with the highest score under `scoreFn`.
 */
class MinHeap<T> {
  private data: T[] = [];
  constructor(private cmp: (a: T, b: T) => number) {}
  size() { return this.data.length; }
  peek() { return this.data[0]; }
  push(v: T) {
    this.data.push(v);
    this.bubbleUp(this.data.length - 1);
  }
  pop(): T | undefined {
    if (!this.data.length) return undefined;
    const top = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length) {
      this.data[0] = last;
      this.sinkDown(0);
    }
    return top;
  }
  values() { return [...this.data]; }
  private bubbleUp(i: number) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.cmp(this.data[i], this.data[p]) < 0) {
        [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
        i = p;
      } else break;
    }
  }
  private sinkDown(i: number) {
    const n = this.data.length;
    while (true) {
      const l = 2 * i + 1, r = 2 * i + 2;
      let s = i;
      if (l < n && this.cmp(this.data[l], this.data[s]) < 0) s = l;
      if (r < n && this.cmp(this.data[r], this.data[s]) < 0) s = r;
      if (s !== i) {
        [this.data[i], this.data[s]] = [this.data[s], this.data[i]];
        i = s;
      } else break;
    }
  }
}

export function topK(products: Product[], k: number, scoreFn: (p: Product) => number): Product[] {
  if (k <= 0) return [];
  const heap = new MinHeap<Product>((a, b) => scoreFn(a) - scoreFn(b));
  for (const p of products) {
    if (heap.size() < k) heap.push(p);
    else if (scoreFn(p) > scoreFn(heap.peek()!)) {
      heap.pop();
      heap.push(p);
    }
  }
  return heap.values().sort((a, b) => scoreFn(b) - scoreFn(a));
}

export type Filters = {
  minPrice: number;
  maxPrice: number;
  minRating: number;
};

export function filterProducts(products: Product[], f: Filters): Product[] {
  return products.filter(
    (p) => p.price >= f.minPrice && p.price <= f.maxPrice && p.rating >= f.minRating,
  );
}
