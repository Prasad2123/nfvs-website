import React from 'react';
import { Hammer } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

interface ComingSoonPageProps {
  moduleName?: string;
}

export function ComingSoonPage({ moduleName = 'This module' }: ComingSoonPageProps) {
  return (
    <div className="flex h-full w-full items-center justify-center pt-20">
      <EmptyState
        icon={Hammer}
        title="Coming Soon"
        description={`${moduleName} is currently under development and will be available in a future update.`}
      />
    </div>
  );
}
