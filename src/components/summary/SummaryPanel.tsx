import type { SummaryItem } from "@/types/form";
import { SummaryCard } from "./SummaryCard";

type SummaryPanelProps = {
  items: SummaryItem[];
  onEdit: (id: SummaryItem["id"]) => void;
};

export function SummaryPanel({ items, onEdit }: SummaryPanelProps) {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">Dados confirmados</h2>
        <p className="text-sm text-slate-500">
          Cada resposta confirmada aparece aqui.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          Os dados preenchidos vão aparecer aqui aos poucos.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <SummaryCard key={item.id} item={item} onEdit={onEdit} />
          ))}
        </div>
      )}
    </aside>
  );
}