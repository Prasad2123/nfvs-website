import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Card, CardContent } from '../ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'slate';
}

const colorStyles = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  amber: 'bg-amber-100 text-amber-600',
  red: 'bg-red-100 text-red-600',
  purple: 'bg-purple-100 text-purple-600',
  slate: 'bg-slate-100 text-slate-600',
};

export function StatCard({ title, value, icon: Icon, trend, trendValue, color = 'blue' }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-2xl font-bold tracking-tight text-slate-900">{value}</p>
          </div>
          <div className={cn("h-12 w-12 rounded-full flex items-center justify-center", colorStyles[color])}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        {trend && trendValue && (
          <div className="mt-4 flex items-center text-sm">
            <span
              className={cn(
                "font-medium flex items-center",
                trend === 'up' ? "text-green-600" : "text-red-600"
              )}
            >
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </span>
            <span className="text-slate-500 ml-2">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
