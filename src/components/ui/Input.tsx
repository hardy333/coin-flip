import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightContent?: React.ReactNode;
  variant?: 'default' | 'betting' | 'dark';
}

export const Input = ({
  label,
  error,
  rightContent,
  variant = 'default',
  className = '',
  ...props
}: InputProps) => {
  const baseStyles = 'w-full focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';

  const variantStyles = {
    default: 'bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-500',
    betting: 'bg-black/40 border-2 border-white/10 rounded-xl py-2 px-3 text-xl text-white font-mono font-black text-center focus:border-amber-500/50',
    dark: 'bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 focus:border-white/20 focus:ring-0 placeholder:text-white/30'
  };

  const labelStyles = {
    default: 'text-sm font-medium text-slate-400',
    betting: 'text-xs text-white/50 font-bold uppercase tracking-wider',
    dark: 'text-xs text-white/40 font-bold uppercase tracking-wider'
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className={labelStyles[variant]}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
          {...props}
        />
        {rightContent && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 font-bold">
            {rightContent}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
};
