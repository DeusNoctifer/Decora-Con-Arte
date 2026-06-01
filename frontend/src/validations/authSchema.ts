import { z } from 'zod';

import { getPasswordValidationError } from './password';
import { isValidPhone, normalizePhone, PHONE_ERROR_MESSAGE } from './phone';

export const registerSchema = z.object({
  nombres: z.string().min(2, "El nombre es muy corto"),
  apellidos: z.string().min(2, "El apellido es muy corto"),
  correo: z.string().email("Correo inválido"),
  tel: z
    .string()
    .refine((val) => isValidPhone(val), PHONE_ERROR_MESSAGE)
    .transform((val) => (val.trim() === '' ? val : normalizePhone(val))),
  genero: z.string().min(1, "Selecciona un género"),
  fechaNacimiento: z
    .string()
    .min(1, "La fecha de nacimiento es obligatoria")
    .refine((val) => !isNaN(Date.parse(val)), "Fecha inválida")
    .refine((val) => new Date(val) <= new Date(), "La fecha no puede ser futura"),
  password: z.string(),
  confirmPassword: z.string(),
}).superRefine((data, ctx) => {
  const passwordError = getPasswordValidationError(data.password, {
    email: data.correo,
    nombres: data.nombres,
    apellidos: data.apellidos,
  });

  if (passwordError) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: passwordError,
      path: ['password'],
    });
  }

  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword'],
    });
  }
});

export type RegisterFormData = z.infer<typeof registerSchema>;
