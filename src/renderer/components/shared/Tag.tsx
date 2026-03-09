import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant?: 'teal' | 'blue' | 'green' | 'red' | 'purple';
  className?: string;
}

const variantClass = {
  teal: 'tag-teal',
  blue: 'tag-blue',
  green: 'tag-green',
  red: 'tag-red',
  purple: 'tag-purple',
};

export function Tag({ children, variant = 'teal', className = '' }: TagProps) {
  return <span className={`${variantClass[variant]} ${className}`}>{children}</span>;
}
