import { z } from "zod";
import { isValidCpf, isValidDate, isValidEmail, isValidPhone } from "@/lib/validators";

export const formSchema = z.object({
  guardianName: z
    .string()
    .min(1, "Me diga seu nome para eu saber com quem estou falando.")
    .min(6, "Esse nome parece curto. Pode escrever o nome completo?"),

  guardianCpf: z
    .string()
    .min(1, "Preciso do CPF para continuar o cadastro.")
    .refine(isValidCpf, "Esse CPF não parece válido. Dá uma conferida nos números?"),

  guardianPhone: z
    .string()
    .min(1, "Me passe um telefone para a escola conseguir falar com você.")
    .refine(isValidPhone, "Esse telefone parece incompleto. Coloque o DDD também."),

  guardianEmail: z
    .string()
    .optional()
    .refine((value) => !value || isValidEmail(value), {
      message: "Esse e-mail parece incompleto. Tente algo como: nome@email.com",
    }),

  studentName: z
    .string()
    .min(1, "Preciso saber o nome do aluno para continuar.")
    .min(6, "Esse nome parece curto. Pode escrever o nome completo?"),

  studentBirthdate: z
    .string()
    .min(1, "Preciso da data de nascimento para continuar.")
    .refine(isValidDate, "Não entendi a data. Tente escrever assim: 19/04/2020."),

  studentGrade: z
    .string()
    .min(1, "Escolha uma série para continuar. Se não souber, escreva: Não sei ainda."),

  studentAllergies: z
    .string()
    .min(1, "Me diga se o aluno tem alguma alergia. Se não tiver, escreva: Nenhuma."),

  studentSpecialNeeds: z
    .string()
    .min(1, "Me diga se existe algum cuidado especial. Pode responder Sim ou Não."),

  studentNotes: z.string().optional(),
});

export type ConversationalFormValues = z.infer<typeof formSchema>;