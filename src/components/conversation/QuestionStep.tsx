"use client";

import { AlertCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Step } from "@/types/form";
import { formatByType } from "@/lib/formatters";

type QuestionStepProps = {
  step: Step;
  value: string;
  error?: string;
  progress: number;
  onChange: (value: string) => void;
  onConfirm: () => void;
};

export function QuestionStep({
  step,
  value,
  error,
  progress,
  onChange,
  onConfirm,
}: QuestionStepProps) {
  const Icon = step.icon;

  function handleChange(rawValue: string) {
    onChange(formatByType(step.type, rawValue));
  }

  return (
    <motion.section
      key={step.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Icon size={22} />
          </div>

          <div>
            <p className="text-sm font-medium text-emerald-700">
              Cadastro guiado
            </p>
            <h1 className="text-2xl font-bold text-slate-900">{step.title}</h1>
          </div>
        </div>

        {step.description && (
          <p className="text-slate-500">{step.description}</p>
        )}
      </div>

      <div className="mb-5">
        <div className="mb-2 flex justify-between text-sm text-slate-500">
          <span>Progresso</span>
          <span>{progress}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full rounded-full bg-emerald-500"
            initial={false}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {step.type === "textarea" ? (
          <textarea
            value={value}
            onChange={(event) => handleChange(event.target.value)}
            placeholder={step.placeholder}
            rows={5}
            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
          />
        ) : (
          <input
            value={value}
            onChange={(event) => handleChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") onConfirm();
            }}
            placeholder={step.placeholder}
            type={step.type === "email" ? "email" : "text"}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
          />
        )}

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
            >
              <AlertCircle className="mt-0.5 shrink-0" size={18} />
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={onConfirm}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          Confirmar
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.section>
  );
}