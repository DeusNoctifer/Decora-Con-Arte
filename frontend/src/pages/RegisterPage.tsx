import { useState } from 'react';
import { Link } from 'react-router-dom';
import { InputGroup } from '../components/InputGroup';
import { registerUser } from '../services/authService';
import { registerSchema } from '../validations/authSchema';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    tel: '',
    genero: '',
    fechaNacimiento: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    const result = registerSchema.safeParse(newFormData);

    if (!result.success) {
      const fieldError = result.error.issues.find((issue) => issue.path[0] === name);

      setErrors((prev) => {
        const newErrs = { ...prev };
        if (fieldError) {
          newErrs[name] = fieldError.message;
        } else {
          delete newErrs[name];
        }
        return newErrs;
      });
    } else {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const genderMap: { [key: string]: string } = {
      Masculino: 'M',
      Femenino: 'F',
      Otro: 'O',
    };

    const payload = {
      names: result.data.nombres,
      surnames: result.data.apellidos,
      email: result.data.correo,
      tel: result.data.tel,
      gender: genderMap[result.data.genero] || 'O',
      date_of_birth: result.data.fechaNacimiento,
      password: result.data.password,
    };

    try {
      await registerUser(payload);
      alert('Éxito');
    } catch (error: any) {
      if (error.response?.data) {
        const djErr = error.response.data;
        const newErrors: { [key: string]: string } = {};
        if (djErr.email) newErrors.correo = djErr.email[0];
        if (djErr.names) newErrors.nombres = djErr.names[0];
        if (djErr.tel) newErrors.tel = djErr.tel[0];
        if (djErr.password) {
          newErrors.password = Array.isArray(djErr.password)
            ? djErr.password.join(' ')
            : djErr.password;
        }
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center p-4 sm:p-6 py-8 md:py-6 bg-brand-light">
      <div className="bg-white p-6 sm:p-8 md:p-12 rounded-xl shadow-lg border border-gray-100 w-full max-w-3xl">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-sm text-gray-500 mb-2 tracking-wide">Decora Con Arte</p>
          <h1 className="text-xl sm:text-2xl font-bold text-brand-dark border-b-4 border-brand-primary inline-block pb-1">
            Regístrate
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" noValidate>
          <InputGroup
            name="nombres"
            label="Nombres"
            placeholder="Ej: Juan"
            required
            onChange={handleChange}
            value={formData.nombres}
            error={errors.nombres}
          />
          <InputGroup
            name="apellidos"
            label="Apellidos"
            placeholder="Ej: Pérez"
            required
            onChange={handleChange}
            value={formData.apellidos}
            error={errors.apellidos}
          />

          <InputGroup
            name="correo"
            label="Correo"
            type="email"
            autoComplete="email"
            containerClassName="md:col-span-2"
            placeholder="tu@email.com"
            required
            onChange={handleChange}
            value={formData.correo}
            error={errors.correo}
          />
          <InputGroup
            name="tel"
            label="Teléfono"
            type="tel"
            autoComplete="tel"
            containerClassName="md:col-span-2"
            placeholder="Ej: +57 300 000 0000"
            onChange={handleChange}
            value={formData.tel}
            error={errors.tel}
          />

          <InputGroup
            name="genero"
            label="Género"
            isSelect
            options={['Femenino', 'Masculino', 'Otro']}
            required
            onChange={handleChange}
            value={formData.genero}
            error={errors.genero}
          />
          <InputGroup
            name="fechaNacimiento"
            label="Fecha de nacimiento"
            type="date"
            required
            onChange={handleChange}
            value={formData.fechaNacimiento}
            error={errors.fechaNacimiento}
          />

          <InputGroup
            name="password"
            label="Contraseña"
            type="password"
            autoComplete="new-password"
            containerClassName="md:col-span-2"
            placeholder="Mín. 8 caracteres, no solo números ni muy común"
            required
            onChange={handleChange}
            value={formData.password}
            error={errors.password}
          />
          <InputGroup
            name="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            autoComplete="new-password"
            containerClassName="md:col-span-2"
            placeholder="Repite tu contraseña"
            required
            onChange={handleChange}
            value={formData.confirmPassword}
            error={errors.confirmPassword}
          />

          <div className="md:col-span-2 mt-2 flex flex-col items-center gap-4">
            <button
              type="submit"
              className="w-full py-3 min-h-[44px] bg-brand-primary text-brand-dark font-bold rounded-md hover:bg-brand-primary-hover transition-all duration-300"
            >
              Regístrate
            </button>
            <p className="text-sm text-center text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link
                to="/login"
                className="font-bold text-brand-dark underline-offset-2 hover:underline hover:text-brand-primary-hover transition-colors"
              >
                ¡Inicia sesión!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
