import React from 'react';
import clsx from 'clsx';

// Card root
export function Card({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        'rounded-2xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}


export function Button({ children, ...props }) {
    return (
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded"
        {...props}
      >
        {children}
      </button>
    );
  }

// CardHeader
export function CardHeader({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        'px-6 py-4 border-b border-gray-200 dark:border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// CardTitle
export function CardTitle({ children, className, ...props }) {
  return (
    <h3
      className={clsx(
        'text-xl font-semibold text-gray-900 dark:text-white',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

// CardDescription
export function CardDescription({ children, className, ...props }) {
  return (
    <p
      className={clsx(
        'mt-2 text-gray-600 dark:text-gray-400',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

// CardContent
export function CardContent({ children, className, ...props }) {
  return (
    <div className={clsx('p-6', className)} {...props}>
      {children}
    </div>
  );
}
