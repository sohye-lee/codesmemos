import Container from '@/components/ui/containers/container';
import { boxClassName } from '@/lib/constants';
import React from 'react';

export default function AdminDashboardPage() {
  return (
    <Container width="medium">
      <div className="w-full grid md:grid-cols-2 gap-3">
        <div className={`${boxClassName}`}>
          <h3 className="text-lg font-medium">Languages</h3>
        </div>
      </div>
    </Container>
  );
}
