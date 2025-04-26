import React from 'react';

export function Badge({ children, variant = 'gray', className = '', ...props }) {
  const base = 'inline-block px-2 py-0.5 rounded-full text-xs font-medium';
  const colors = {
    gray: 'bg-gray-200 text-gray-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    // add more variants as needed
  };
  return (
    <span className={`${base} ${colors[variant] || colors.gray} ${className}`} {...props}>
      {children}
    </span>
  );
}
