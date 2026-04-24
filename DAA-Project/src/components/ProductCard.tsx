import { Star, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/sorting";

type Props = { product: Product; rank?: number };

export const ProductCard = ({ product, rank }: Props) => {
  return (
    <Card className="group overflow-hidden border-border/60 bg-card shadow-[var(--shadow-card)] transition-[var(--transition-smooth)] hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {rank !== undefined && (
          <Badge className="absolute left-3 top-3 bg-[image:var(--gradient-primary)] text-primary-foreground shadow-md">
            #{rank}
          </Badge>
        )}
        <Badge variant="secondary" className="absolute right-3 top-3 backdrop-blur">
          #{product.addedIndex + 1}
        </Badge>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight text-card-foreground">{product.name}</h3>
          <span className="shrink-0 font-bold text-primary">${product.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {product.rating.toFixed(1)}
          </span>
          <span className="inline-flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            {product.popularity}
          </span>
        </div>
      </div>
    </Card>
  );
};
