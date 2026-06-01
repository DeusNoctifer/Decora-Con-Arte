const COMMON_PASSWORDS = new Set([
  'password',
  'password1',
  'password123',
  '12345678',
  '123456789',
  'qwerty123',
  'admin123',
  'letmein',
  'welcome',
  'iloveyou',
  'decora123',
]);

type PasswordContext = {
  email?: string;
  nombres?: string;
  apellidos?: string;
};

function isTooSimilar(password: string, attribute: string): boolean {
  const normalizedAttribute = attribute.trim().toLowerCase();
  if (normalizedAttribute.length < 3) {
    return false;
  }

  const normalizedPassword = password.toLowerCase();
  return (
    normalizedPassword === normalizedAttribute ||
    normalizedPassword.includes(normalizedAttribute) ||
    normalizedAttribute.includes(normalizedPassword)
  );
}

export function getPasswordValidationError(
  password: string,
  context: PasswordContext = {}
): string | null {
  if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres.';
  }

  if (/^\d+$/.test(password)) {
    return 'La contraseña no puede ser solo números.';
  }

  if (COMMON_PASSWORDS.has(password.toLowerCase())) {
    return 'La contraseña es demasiado común.';
  }

  const emailLocalPart = context.email?.split('@')[0] ?? '';
  const attributes = [emailLocalPart, context.nombres ?? '', context.apellidos ?? ''];

  if (attributes.some((attribute) => isTooSimilar(password, attribute))) {
    return 'La contraseña es demasiado similar a tus datos personales.';
  }

  return null;
}
