export function onlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

export function formatCpf(value: string) {
  const numbers = onlyNumbers(value).slice(0, 11);

  return numbers
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

export function formatPhone(value: string) {
  const numbers = onlyNumbers(value).slice(0, 11);

  if (numbers.length <= 10) {
    return numbers
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return numbers
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function formatDate(value: string) {
  const numbers = onlyNumbers(value).slice(0, 8);

  return numbers
    .replace(/^(\d{2})(\d)/, "$1/$2")
    .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
}

export function formatByType(type: string, value: string) {
  switch (type) {
    case "cpf":
      return formatCpf(value);
    case "phone":
      return formatPhone(value);
    case "date":
      return formatDate(value);
    default:
      return value;
  }
}

export function normalizeByType(type: string, value: string) {
  if (type === "cpf" || type === "phone") {
    return onlyNumbers(value);
  }

  return value.trim();
}