import { useState } from 'react';
import { Link } from 'react-router-dom';
import { InputGroup } from '../components/InputGroup';
import { registerUser } from '../services/authService';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const genderMap: { [key: string]: string } = {
      'Masculino': 'M',
      'Femenino': 'F',
      'Otro': 'O'
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
      const response = await registerUser(payload);
      console.log("¡Éxito total!", response);
      alert("¡Usuario creado exitosamente!");
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.error("Detalles del error en Django:", error.response.data);
      } else {
        console.error("Error desconocido:", error);
        alert("Error de conexión con el servidor.");
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
          <InputGroup name="nombres" label="Primer Nombre" placeholder="Ej: Juan" required onChange={handleChange} value={formData.nombres} />
          <InputGroup name="apellidos" label="Primer Apellido" placeholder="Ej: Perez" required onChange={handleChange} value={formData.apellidos} />
          
          <InputGroup name="correo" label="Correo" type="email" containerClassName="md:col-span-2" placeholder='Ingresa tu correo electrónico' required onChange={handleChange} value={formData.correo} />
          <InputGroup name="tel" label="Número" type="tel" containerClassName="md:col-span-2" placeholder='Ingresa tu número de teléfono' required onChange={handleChange} value={formData.tel} />
          
          <InputGroup name="genero" label="Género" isSelect options={['Femenino', 'Masculino', 'Otro']} required onChange={handleChange} value={formData.genero} />
          <InputGroup name="fechaNacimiento" label="Fecha Nacimiento" type="date" placeholder='Ingresa tu fecha de nacimiento' required onChange={handleChange} value={formData.fechaNacimiento} />
          
          <InputGroup name="password" label="Contraseña" type="password" containerClassName="md:col-span-2" placeholder='Ingresa tu contraseña' required onChange={handleChange} value={formData.password} />
          <InputGroup name="confirmPassword" label="Confirmar Contraseña" type="password" containerClassName="md:col-span-2" placeholder='Confirma tu contraseña' required onChange={handleChange} value={formData.confirmPassword} />

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