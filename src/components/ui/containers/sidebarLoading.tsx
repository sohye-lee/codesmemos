import React from 'react';
import { Skeleton } from '@nextui-org/react';

export default function SidebarLoading() {
  return (
    <div className="border border-slate-500 border-r-2 border-b-2 p-3 flex flex-col gap-3 z-0">
      <div className="border border-gray-300 p-4  flex flex-col gap-5">
        <div className="w-full">
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="w-full flex flex-col gap-3">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-1/2" />
        </div>
      </div>
    </div>
  );
}
