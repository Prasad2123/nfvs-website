import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoadingSpinnerProps {
  variant?: 'full-page' | 'inline' | 'button';
  className?: string;
}

export function LoadingSpinner({ variant = 'inline', className }: LoadingSpinnerProps) {
  if (variant === 'full-page') {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <p className="mt-4 text-sm font-medium text-slate-600">Loading...</p>
      </div>
    );
  }

  return (
    <Loader2 
      className={cn(
        "animate-spin text-blue-600",
        variant === 'button' ? "h-4 w-4 text-current" : "h-6 w-6",
        className
      )} 
    />
  );
}
