import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  solid?: boolean;
}

export function GlassCard({ children, className = '', solid = false }: GlassCardProps) {
  const base = solid ? 'glass-card-solid' : 'glass-card';
  return <div className={`${base} ${className}`}>{children}</div>;
}
