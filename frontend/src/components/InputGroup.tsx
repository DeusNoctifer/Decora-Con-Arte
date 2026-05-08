import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Iconos vectoriales limpios

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label: string;
  isSelect?: boolean;
  options?: string[];
  containerClassName?: string;
}

export const InputGroup = ({ label, required, isSelect, options, type, containerClassName, ...props }: InputGroupProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const currentType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      <label className="text-sm font-semibold text-brand-dark">
        {label} {required && <span className="text-brand-dark">*</span>}
      </label>
      
      <div className="relative">
        {isSelect ? (
          <select
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent 
                       appearance-none text-gray-700 text-sm cursor-pointer transition-all duration-300"
            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
            defaultValue=""
          >
            <option value="" disabled>Selecciona una opción</option>
            {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : (
          <input
            type={currentType}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent 
                       placeholder-gray-400 text-sm transition-all duration-300"
            {...props}
          />
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full 
                       hover:bg-gray-100 transition-all duration-300 group"
          >
            <div className={`transition-all duration-300 transform ${showPassword ? 'scale-110 rotate-0' : 'scale-100 rotate-12'}`}>
              {showPassword ? (
                <Eye 
                  size={18} 
                  className="text-brand-primary" // Tu color salmón cuando está abierto
                  strokeWidth={2.5}
                />
              ) : (
                <EyeOff 
                  size={18} 
                  className="text-gray-400 group-hover:text-gray-600" 
                  strokeWidth={2.5}
                />
              )}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};