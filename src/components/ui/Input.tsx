import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({
  label,
  error,
  className = '',
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label &&
        <label className="text-sm font-medium text-slate-400">{label}</label>
      }
      <input
        className={`bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-500 ${className}`}
        {...props} />

      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>);

};