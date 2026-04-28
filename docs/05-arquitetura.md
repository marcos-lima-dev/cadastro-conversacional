# 🧱 Arquitetura e Componentização

Este documento define como o projeto deve ser estruturado e organizado.

---

## 🎯 Objetivo

Garantir que o código seja:

- Modular
- Escalável
- Fácil de manter
- Fácil de evoluir

---

## 📁 Estrutura de pastas

/app
/components
  /conversation
  /summary
  /ui
/flow
/hooks
/lib

---

## 🧩 Separação de responsabilidades

### app/page.tsx
- Apenas estrutura da página
- Não contém lógica de negócio

---

### components/conversation
Responsável pela experiência conversacional:

- ConversationalForm
- StepRenderer
- Input
- Mensagens de erro

---

### components/summary
Responsável por exibir os dados confirmados:

- SummaryPanel
- SummaryCard

---

### components/ui
Componentes reutilizáveis:

- Button
- Input
- Card

---

### flow/
Responsável pela lógica do fluxo:

- steps.ts → perguntas
- schema.ts → validação (Zod)
- messages.ts → mensagens amigáveis

---

### hooks/
- Controle do fluxo
- Estado da aplicação

---

### lib/
Funções utilitárias:

- Validação de CPF
- Formatação de telefone
- Validação de data

---

## ⚠️ Regras importantes

- Não concentrar lógica em um único arquivo
- Evitar duplicação de validação
- Separar UI de lógica
- Centralizar mensagens
- Usar TypeScript para tipagem

---

## 🎯 Resultado esperado

Uma aplicação organizada, onde cada parte tem uma função clara e pode ser modificada sem quebrar o restante do sistema.