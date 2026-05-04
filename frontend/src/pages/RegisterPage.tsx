import React, { useState } from 'react';
import { registerUser, type RegisterData } from '../services/authService';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    names: '',
    surnames: '',
    password: '',
    gender: 'O',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(formData);
      setMessage("¡Cuenta creada con éxito! Ya puedes iniciar sesión.");
    } catch (err: any) {
      setMessage(JSON.stringify(err)); // Aquí podrías mapear errores específicos
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Crea tu cuenta en Decora Con Arte
        </h2>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input name="names" type="text" required placeholder="Nombres" 
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleChange} />
            <input name="surnames" type="text" required placeholder="Apellidos" 
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleChange} />
          </div>
          
          <input name="email" type="email" required placeholder="Correo electrónico" 
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleChange} />

          <input name="password" type="password" required placeholder="Contraseña" 
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleChange} />
            
            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Inicia sesión aquí
                    </Link>
                </p>
            </div>

          <button type="submit" disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>
        {message && <p className="mt-2 text-center text-sm text-gray-600">{message}</p>}
      </div>
      
    </div>
    
  );
};

export default RegisterPage;