import type { LucideIcon } from "lucide-react";

export type FieldType =
  | "text"
  | "email"
  | "cpf"
  | "phone"
  | "date"
  | "textarea";

export type FormData = {
  guardian: {
    name: string;
    cpf: string;
    phone: string;
    email?: string;
  };
  student: {
    name: string;
    birthdate: string;
    grade: string;
    allergies: string;
    specialNeeds: string;
    notes?: string;
  };
};

export type Step = {
  id: keyof FlatFormData;
  title: string;
  description?: string;
  placeholder?: string;
  type: FieldType;
  icon: LucideIcon;
  required?: boolean;
};

export type FlatFormData = {
  guardianName: string;
  guardianCpf: string;
  guardianPhone: string;
  guardianEmail: string;
  studentName: string;
  studentBirthdate: string;
  studentGrade: string;
  studentAllergies: string;
  studentSpecialNeeds: string;
  studentNotes: string;
};

export type SummaryItem = {
  id: keyof FlatFormData;
  label: string;
  value: string;
  icon: LucideIcon;
};