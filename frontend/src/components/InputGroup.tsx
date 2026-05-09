import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label: string;
  isSelect?: boolean;
  options?: string[];
  containerClassName?: string;
  error?: string;
}

export const InputGroup = ({ label, required, isSelect, options, type, containerClassName, error, ...props }: InputGroupProps) => {
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
            className={`w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 appearance-none text-sm cursor-pointer transition-all duration-300
                        ${error ? 'border-red-500 focus:ring-red-500 text-red-900' : 'border-gray-300 focus:ring-brand-primary text-gray-700'}`}
            {...(props as any)} 
            >
            <option value="" disabled>Selecciona una opción</option>
            {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        ) : (
          <input
            type={currentType}
            className={`w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 placeholder-gray-400 text-sm transition-all duration-300
                       ${error ? 'border-red-500 focus:ring-red-500 text-red-900' : 'border-gray-300 focus:ring-brand-primary'}`}
            {...props}
          />
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-all duration-300 group"
          >
            <div className={`transition-all duration-300 transform ${showPassword ? 'scale-110 rotate-0' : 'scale-100 rotate-12'}`}>
              {showPassword ? (
                <Eye size={18} className={error ? 'text-red-500' : 'text-brand-primary'} strokeWidth={2.5} />
              ) : (
                <EyeOff size={18} className={error ? 'text-red-400' : 'text-gray-400 group-hover:text-gray-600'} strokeWidth={2.5} />
              )}
            </div>
          </button>
        )}
      </div>
      
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
            error ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0 mt-0'
        }`}
      >
        <div className="overflow-hidden">
          <span className="text-xs text-red-500 font-medium flex items-center gap-1">
            {error && (
              <>
                <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
                {error}
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};