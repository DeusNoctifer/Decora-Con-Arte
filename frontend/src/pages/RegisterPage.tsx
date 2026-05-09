import { useState } from 'react';
import { Link } from 'react-router-dom';
import { InputGroup } from '../components/InputGroup';
import { registerUser } from '../services/authService';
import { registerSchema } from '../validations/authSchema'; // <-- Importamos el schema

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    tel: '',
    genero: '',
    fechaNacimiento: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    const result = registerSchema.safeParse(newFormData);

    if (!result.success) {
        const fieldError = result.error.issues.find(issue => issue.path[0] === name);
        
        setErrors(prev => {
        const newErrs = { ...prev };
        if (fieldError) {
            newErrs[name] = fieldError.message;
        } else {
            delete newErrs[name];
        }
        return newErrs;
        });
    } else {
        setErrors(prev => {
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
    result.error.issues.forEach(issue => {
      const key = issue.path[0] as string;
      fieldErrors[key] = issue.message;
    });
    setErrors(fieldErrors);
    return;
  }

  const genderMap: { [key: string]: string } = {
    'Masculino': 'M', 'Femenino': 'F', 'Otro': 'O'
  };

  const payload = {
    names: formData.nombres,
    surnames: formData.apellidos,
    email: formData.correo,
    tel: formData.tel,
    gender: genderMap[formData.genero] || 'O',
    date_of_birth: formData.fechaNacimiento,
    password: formData.password
  };

  try {
    await registerUser(payload);
    alert("Éxito");
  } catch (error: any) {
    if (error.response?.data) {
      const djErr = error.response.data;
      const newErrors: { [key: string]: string } = {};
      if (djErr.email) newErrors.correo = djErr.email[0];
      if (djErr.names) newErrors.nombres = djErr.names[0];
      if (djErr.tel) newErrors.tel = djErr.tel[0];
      setErrors(newErrors);
    }
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg w-full max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-brand-dark border-b-4 border-brand-primary inline-block">
            Regístrate
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InputGroup name="nombres" label="Nombres" placeholder="Ej: Juan" required onChange={handleChange} value={formData.nombres} error={errors.nombres} />
          <InputGroup name="apellidos" label="Apellidos" placeholder="Ej: Perez" required onChange={handleChange} value={formData.apellidos} error={errors.apellidos} />
          
          <InputGroup name="correo" label="Correo" type="email" containerClassName="md:col-span-2" placeholder='Ingresa tu correo electrónico' required onChange={handleChange} value={formData.correo} error={errors.correo} />
          <InputGroup name="tel" label="Número" type="tel" containerClassName="md:col-span-2" placeholder='Ej: +57 300 000 0000' onChange={handleChange} value={formData.tel} error={errors.tel} />
          
          <InputGroup name="genero" label="Género" isSelect options={['Femenino', 'Masculino', 'Otro']} required onChange={handleChange} value={formData.genero} error={errors.genero} />
          <InputGroup name="fechaNacimiento" label="Fecha Nacimiento" type="date" placeholder='Ingresa tu fecha de nacimiento' onChange={handleChange} value={formData.fechaNacimiento} error={errors.fechaNacimiento} />
          
          <InputGroup name="password" label="Contraseña" type="password" containerClassName="md:col-span-2" placeholder='Ingresa tu contraseña' required onChange={handleChange} value={formData.password} error={errors.password} />
          <InputGroup name="confirmPassword" label="Confirmar Contraseña" type="password" containerClassName="md:col-span-2" placeholder='Confirma tu contraseña' required onChange={handleChange} value={formData.confirmPassword} error={errors.confirmPassword} />

          <div className="md:col-span-2 mt-6 flex flex-col items-center gap-4">
            <button type="submit" className="w-full py-3 bg-brand-primary text-white font-bold rounded-md hover:bg-opacity-90 transition-all">
              Regístrate
            </button>
            <p className="text-sm">
              ¿Ya tienes una cuenta? <Link to="/login" className="font-bold hover:underline">¡Inicia Sesión!</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;