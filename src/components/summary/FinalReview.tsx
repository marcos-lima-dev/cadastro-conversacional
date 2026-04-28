import type { SummaryItem } from "@/types/form";
import { SummaryCard } from "./SummaryCard";

type FinalReviewProps = {
  items: SummaryItem[];
  onEdit: (id: SummaryItem["id"]) => void;
  onSubmit: () => void;
};

export function FinalReview({ items, onEdit, onSubmit }: FinalReviewProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Revise suas informações
        </h2>
        <p className="text-sm text-slate-500">
          Confira os dados antes de finalizar o cadastro.
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <SummaryCard key={item.id} item={item} onEdit={onEdit} />
        ))}
      </div>

      <button
        onClick={onSubmit}
        className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
      >
        Finalizar cadastro
      </button>
    </div>
  );
}