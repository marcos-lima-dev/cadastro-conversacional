"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

import { formSchema } from "@/flow/schema";
import { useConversationalFlow } from "@/hooks/useConversationalFlow";
import { normalizeByType } from "@/lib/formatters";
import { QuestionStep } from "./QuestionStep";
import { SummaryPanel } from "@/components/summary/SummaryPanel";
import { FinalReview } from "@/components/summary/FinalReview";

export function ConversationalForm() {
  const [error, setError] = useState("");

  const {
    currentStep,
    values,
    progress,
    summaryItems,
    isReviewing,
    updateValue,
    confirmStep,
    editStep,
  } = useConversationalFlow();

  const currentValue = values[currentStep.id];

  function handleConfirm() {
    const normalizedValue = normalizeByType(currentStep.type, currentValue);

    const result = formSchema
      .pick({ [currentStep.id]: true })
      .safeParse({ [currentStep.id]: normalizedValue });

    if (!result.success) {
      const message =
        result.error.issues[0]?.message ||
        "Quase lá! Confira essa informação antes de continuar.";

      setError(message);
      return;
    }

    updateValue(currentStep.id, normalizedValue);
    setError("");
    confirmStep();
  }

  function handleSubmit() {
    alert("Cadastro enviado com sucesso! 🎉");
  }

  if (isReviewing) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <FinalReview
            items={summaryItems}
            onEdit={editStep}
            onSubmit={handleSubmit}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              <Sparkles size={16} />
              Formulário conversacional
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Olá, quero te ajudar hoje!
            </h1>

            <p className="mt-2 text-slate-500">
              Vou fazer perguntas rápidas. Cada resposta confirmada aparece ao
              lado para você acompanhar tudo.
            </p>
          </div>

          <AnimatePresence mode="wait">
            <QuestionStep
              key={currentStep.id}
              step={currentStep}
              value={currentValue}
              error={error}
              progress={progress}
              onChange={(value) => {
                setError("");
                updateValue(currentStep.id, value);
              }}
              onConfirm={handleConfirm}
            />
          </AnimatePresence>

          {summaryItems.length > 0 && (
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-800">
              <CheckCircle2 size={18} />
              Resposta confirmada. Pode continuar.
            </div>
          )}
        </section>

        <SummaryPanel items={summaryItems} onEdit={editStep} />
      </div>
    </main>
  );
}