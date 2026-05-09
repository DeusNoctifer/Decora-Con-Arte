// src/validations/authSchema.ts
import { z } from 'zod';

// src/validations/authSchema.ts
export const registerSchema = z.object({
  nombres: z.string().min(2, "El nombre es muy corto"),
  apellidos: z.string().min(2, "El apellido es muy corto"),
  correo: z.string().email("Correo inválido"),
  tel: z.string().regex(/^\+?1?\d{0,15}$/, "Teléfono inválido"),
  genero: z.string().min(1, "Selecciona un género"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
});

export type RegisterFormData = z.infer<typeof registerSchema>;