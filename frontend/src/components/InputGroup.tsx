import { useId, useState } from 'react';
import { ChevronDown, Eye, EyeOff } from 'lucide-react';

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label: string;
  isSelect?: boolean;
  options?: string[];
  containerClassName?: string;
  error?: string;
}

const fieldBase =
  'w-full px-3 py-2.5 min-h-[44px] bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 text-sm transition-all duration-300';

export const InputGroup = ({
  label,
  required,
  isSelect,
  options,
  type,
  containerClassName,
  error,
  name,
  id,
  ...props
}: InputGroupProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();
  const inputId = id ?? (typeof name === 'string' ? name : undefined) ?? generatedId;
  const errorId = `${inputId}-error`;
  const isPassword = type === 'password';
  const currentType = isPassword && showPassword ? 'text' : type;

  const fieldState = error
    ? 'border-red-500 focus:ring-red-500 text-red-900'
    : 'border-gray-300 focus:ring-brand-primary text-gray-700';

  const paddingRight = isPassword || isSelect ? 'pr-10' : '';

  return (
    <div className={`flex flex-col ${containerClassName ?? ''}`}>
      <label htmlFor={inputId} className="text-sm font-semibold text-brand-dark">
        {label}{' '}
        {required && <span className="text-brand-primary-hover" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (obligatorio)</span>}
      </label>

      <div className="relative">
        {isSelect ? (
          <>
            <select
              id={inputId}
              name={name}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              className={`${fieldBase} ${fieldState} ${paddingRight} appearance-none cursor-pointer`}
              {...props}
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              {options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${error ? 'text-red-400' : 'text-brand-primary'}`}
              aria-hidden="true"
            />
          </>
        ) : (
          <>
            <input
              id={inputId}
              name={name}
              type={currentType}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              className={`${fieldBase} ${fieldState} ${paddingRight} placeholder:text-gray-400`}
              {...props}
            />
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-all duration-300 group"
              >
                <div
                  className={`transition-all duration-300 transform ${showPassword ? 'scale-110 rotate-0' : 'scale-100 rotate-12'}`}
                >
                  {showPassword ? (
                    <Eye
                      size={18}
                      className={error ? 'text-red-500' : 'text-brand-primary'}
                      strokeWidth={2.5}
                    />
                  ) : (
                    <EyeOff
                      size={18}
                      className={error ? 'text-red-400' : 'text-gray-400 group-hover:text-gray-600'}
                      strokeWidth={2.5}
                    />
                  )}
                </div>
              </button>
            )}
          </>
        )}
      </div>

      <div
        className={` grid transition-all duration-300 ease-in-out ${
          error ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0 mt-0'
        }`}
      >
        <div className="overflow-hidden">
          <span id={errorId} role="alert" className="text-xs text-red-500 font-medium flex items-center gap-1">
            {error && (
              <>
                <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse shrink-0" />
                {error}
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
