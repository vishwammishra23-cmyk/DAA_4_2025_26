import { useMemo, useState } from "react";
import { Package } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SortControls } from "@/components/SortControls";
import { Badge } from "@/components/ui/badge";
import { generateProducts } from "@/lib/products";
import {
  filterProducts, sortProducts, topK as topKHeap,
  SORT_OPTIONS, type SortKey, type Filters,
} from "@/lib/sorting";

const ALL_PRODUCTS = generateProducts();
const MAX_PRICE = Math.max(...ALL_PRODUCTS.map((p) => p.price));

const Index = () => {
  const [sortKey, setSortKey] = useState<SortKey>("rating-then-price");
  const [stable, setStable] = useState(true);
  const [topK, setTopK] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    minPrice: 0, maxPrice: Math.ceil(MAX_PRICE), minRating: 0,
  });

  const visible = useMemo(() => {
    const filtered = filterProducts(ALL_PRODUCTS, filters);
    const sorted = sortProducts(filtered, sortKey, stable);
    if (topK > 0) {
      const scoreFn = sortKey === "price-asc"
        ? (p: typeof sorted[number]) => -p.price
        : sortKey === "price-desc"
          ? (p: typeof sorted[number]) => p.price
          : sortKey === "rating-desc" || sortKey === "rating-then-price"
            ? (p: typeof sorted[number]) => p.rating
            : (p: typeof sorted[number]) => p.popularity;
      return topKHeap(sorted, topK, scoreFn);
    }
    return sorted;
  }, [sortKey, stable, topK, filters]);

  const activeLabel = SORT_OPTIONS.find((o) => o.key === sortKey)?.label ?? "";

  return (
    <div className="min-h-screen bg-[image:var(--gradient-subtle)]">
      <header className="border-b border-border/60 bg-card/60 backdrop-blur">
        <div className="container flex flex-col gap-2 py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Product Sorting Engine</h1>
              <p className="text-sm text-muted-foreground">
                Multi-level sorting, stability toggle, top-K heap & filters
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container space-y-6 py-8">
        <SortControls
          sortKey={sortKey} onSortKeyChange={setSortKey}
          stable={stable} onStableChange={setStable}
          topK={topK} onTopKChange={setTopK}
          filters={filters} onFiltersChange={setFilters}
          maxPrice={MAX_PRICE}
        />

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Badge variant="secondary">Sort: {activeLabel}</Badge>
          <Badge variant={stable ? "default" : "destructive"}>
            {stable ? "Stable" : "Unstable"}
          </Badge>
          {topK > 0 && <Badge className="bg-[image:var(--gradient-primary)] text-primary-foreground">Top {topK} (heap)</Badge>}
          <span className="ml-auto text-muted-foreground">
            Showing {visible.length} / {ALL_PRODUCTS.length}
          </span>
        </div>

        {visible.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center text-muted-foreground">
            No products match your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((p, idx) => (
              <ProductCard key={p.id} product={p} rank={topK > 0 ? idx + 1 : undefined} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
