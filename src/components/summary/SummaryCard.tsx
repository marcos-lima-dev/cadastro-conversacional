import { Pencil } from "lucide-react";
import type { SummaryItem } from "@/types/form";

type SummaryCardProps = {
  item: SummaryItem;
  onEdit: (id: SummaryItem["id"]) => void;
};

export function SummaryCard({ item, onEdit }: SummaryCardProps) {
  const Icon = item.icon;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Icon size={20} />
          </div>

          <div>
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="font-semibold text-slate-900">{item.value}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onEdit(item.id)}
          className="rounded-xl p-2 text-slate-400 opacity-80 transition hover:bg-slate-100 hover:text-slate-700 group-hover:opacity-100"
          aria-label={`Editar ${item.label}`}
        >
          <Pencil size={16} />
        </button>
      </div>
    </div>
  );
}