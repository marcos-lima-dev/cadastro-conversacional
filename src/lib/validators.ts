import { onlyNumbers } from "./formatters";

export function isValidEmail(value: string) {
  if (!value.trim()) return true;

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidCpf(value: string) {
  const cpf = onlyNumbers(value);

  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += Number(cpf[i]) * (10 - i);
  }

  let firstDigit = (sum * 10) % 11;
  if (firstDigit === 10) firstDigit = 0;
  if (firstDigit !== Number(cpf[9])) return false;

  sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += Number(cpf[i]) * (11 - i);
  }

  let secondDigit = (sum * 10) % 11;
  if (secondDigit === 10) secondDigit = 0;

  return secondDigit === Number(cpf[10]);
}

export function isValidPhone(value: string) {
  const phone = onlyNumbers(value);

  return phone.length === 10 || phone.length === 11;
}

export function isValidDate(value: string) {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) return false;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const currentYear = new Date().getFullYear();

  if (year < 1990 || year > currentYear) return false;
  if (month < 1 || month > 12) return false;

  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}