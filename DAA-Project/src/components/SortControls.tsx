import { ArrowUpDown, Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS, type SortKey, type Filters } from "@/lib/sorting";

type Props = {
  sortKey: SortKey;
  onSortKeyChange: (k: SortKey) => void;
  stable: boolean;
  onStableChange: (v: boolean) => void;
  topK: number;
  onTopKChange: (n: number) => void;
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
  maxPrice: number;
};

export const SortControls = ({
  sortKey, onSortKeyChange, stable, onStableChange,
  topK, onTopKChange, filters, onFiltersChange, maxPrice,
}: Props) => {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <ArrowUpDown className="h-3.5 w-3.5" /> Sort by
          </Label>
          <Select value={sortKey} onValueChange={(v) => onSortKeyChange(v as SortKey)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.key} value={o.key}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <span>Stable sort</span>
            <Switch checked={stable} onCheckedChange={onStableChange} />
          </Label>
          <p className="text-xs text-muted-foreground">
            {stable ? "Equal items keep order" : "Equal items may shuffle"}
          </p>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" /> Top K (heap)
            </span>
            <span className="text-foreground">{topK || "off"}</span>
          </Label>
          <Slider
            value={[topK]} min={0} max={10} step={1}
            onValueChange={([v]) => onTopKChange(v)}
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <span>Min rating</span>
            <span className="text-foreground">{filters.minRating.toFixed(1)}★</span>
          </Label>
          <Slider
            value={[filters.minRating]} min={0} max={5} step={0.5}
            onValueChange={([v]) => onFiltersChange({ ...filters, minRating: v })}
          />
        </div>

        <div className="space-y-2 md:col-span-2 lg:col-span-4">
          <Label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <span>Price range</span>
            <span className="text-foreground">
              ${filters.minPrice.toFixed(0)} – ${filters.maxPrice.toFixed(0)}
            </span>
          </Label>
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            min={0} max={Math.ceil(maxPrice)} step={5}
            onValueChange={([a, b]) => onFiltersChange({ ...filters, minPrice: a, maxPrice: b })}
          />
        </div>
      </div>
    </div>
  );
};
