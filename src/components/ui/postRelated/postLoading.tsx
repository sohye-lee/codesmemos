import React from 'react';
import { Skeleton } from '@nextui-org/react';

export default function PostLoading() {
  return (
    <div className="flex flex-col gap-3">
      <div className="border border-gray-300 p-4  flex flex-col gap-5">
        <div className="w-full">
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="w-full flex flex-col gap-3">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-1/2" />
        </div>
      </div>
      <div className="border border-gray-300 p-4  flex flex-col gap-5">
        <div className="w-full">
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </div>
  );
}
