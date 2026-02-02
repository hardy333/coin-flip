import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}
export const Card = ({
  children,
  className = '',
  title
}: CardProps) => {
  return (
    <div
      className={`bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 ${className}`}>

      {title &&
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          {title}
        </h3>
      }
      {children}
    </div>);

};