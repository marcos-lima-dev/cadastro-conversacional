"use client";

import { useMemo, useState } from "react";
import type { FlatFormData, SummaryItem } from "@/types/form";
import { steps } from "@/flow/steps";
import { formatByType } from "@/lib/formatters";

const initialValues: FlatFormData = {
  guardianName: "",
  guardianCpf: "",
  guardianPhone: "",
  guardianEmail: "",
  studentName: "",
  studentBirthdate: "",
  studentGrade: "",
  studentAllergies: "",
  studentSpecialNeeds: "",
  studentNotes: "",
};

const labels: Record<keyof FlatFormData, string> = {
  guardianName: "Nome do responsável",
  guardianCpf: "CPF",
  guardianPhone: "Telefone",
  guardianEmail: "E-mail",
  studentName: "Nome do aluno",
  studentBirthdate: "Data de nascimento",
  studentGrade: "Série",
  studentAllergies: "Alergias",
  studentSpecialNeeds: "Necessidade especial",
  studentNotes: "Observações",
};

export function useConversationalFlow() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [values, setValues] = useState<FlatFormData>(initialValues);
  const [completedSteps, setCompletedSteps] = useState<(keyof FlatFormData)[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);

  const currentStep = steps[currentStepIndex];

  const progress = Math.round((completedSteps.length / steps.length) * 100);

  const summaryItems = useMemo<SummaryItem[]>(() => {
    return completedSteps.map((id) => {
      const step = steps.find((item) => item.id === id)!;
      const rawValue = values[id];
      const value = rawValue ? formatByType(step.type, rawValue) : "Não informado";

      return {
        id,
        label: labels[id],
        value,
        icon: step.icon,
      };
    });
  }, [completedSteps, values]);

  function updateValue(id: keyof FlatFormData, value: string) {
    setValues((current) => ({
      ...current,
      [id]: value,
    }));
  }

  function confirmStep() {
    const id = currentStep.id;

    setCompletedSteps((current) => {
      if (current.includes(id)) return current;
      return [...current, id];
    });

    if (currentStepIndex >= steps.length - 1) {
      setIsReviewing(true);
      return;
    }

    setCurrentStepIndex((current) => current + 1);
  }

  function editStep(id: keyof FlatFormData) {
    const stepIndex = steps.findIndex((step) => step.id === id);

    if (stepIndex >= 0) {
      setCurrentStepIndex(stepIndex);
      setIsReviewing(false);
    }
  }

  function goToReview() {
    setIsReviewing(true);
  }

  return {
    steps,
    currentStep,
    currentStepIndex,
    values,
    progress,
    summaryItems,
    isReviewing,
    updateValue,
    confirmStep,
    editStep,
    goToReview,
  };
}