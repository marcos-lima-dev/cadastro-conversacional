# 🧭 Comportamento do Formulário Conversacional

Este documento descreve como o formulário deve se comportar durante o uso.

---

## 🎯 Ideia principal

O sistema deve conduzir o usuário por uma conversa simples e amigável.

Em vez de mostrar todos os campos de uma vez, o sistema apresenta **uma pergunta por vez**.

Cada resposta confirmada vira um **card visível na tela**, formando um resumo do cadastro em tempo real.

---

## 💬 Fluxo básico

1. O sistema cumprimenta o usuário.
2. Apresenta a primeira pergunta.
3. O usuário responde.
4. O sistema valida a resposta.
5. Se estiver correta, a resposta é confirmada.
6. A resposta aparece em um card na tela.
7. O sistema avança para a próxima pergunta.
8. O processo se repete até finalizar o cadastro.

---

## ✅ Quando a resposta estiver correta

O sistema deve:

- Salvar a informação
- Criar ou atualizar o card correspondente
- Limpar o campo de entrada
- Avançar para a próxima pergunta
- Atualizar o progresso

Exemplo:

```txt
Usuário informa: Marcos de Sousa Lima

Sistema:
- salva o nome
- exibe o card "Nome do responsável: Marcos de Sousa Lima"
- avança para CPF