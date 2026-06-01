const PHONE_REGEX = /^\+?1?\d{7,15}$/;

export function normalizePhone(value: string): string {
  return value.replace(/[\s\-().]/g, '').trim();
}

export function isValidPhone(value: string): boolean {
  const normalized = normalizePhone(value);
  return normalized === '' || PHONE_REGEX.test(normalized);
}

export const PHONE_ERROR_MESSAGE =
  'Teléfono inválido. Debe tener entre 7 y 15 dígitos (puedes usar espacios).';
