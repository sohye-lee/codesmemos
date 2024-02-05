'use client';
import { WidthType } from '@/lib/types';
import React, { useEffect, useState } from 'react';

interface ContainerProps {
  width: WidthType;
  children: React.ReactNode;
  addClass?: string;
  bgColor?: string;
}

export default function Container({
  width,
  children,
  addClass,
  bgColor,
}: ContainerProps) {
  const [containerWidth, setContainerWidth] = useState('min-w-[599px]');

  useEffect(() => {
    if (width == 'full') {
      setContainerWidth('w-full');
    } else if (width == 'wide') {
      setContainerWidth('w-full max-w-[1199px]');
    } else if (width == 'medium') {
      setContainerWidth('w-full max-w-[899px]');
    } else if (width == 'small') {
      setContainerWidth('w-full max-w-[599px]');
    }
  }, [setContainerWidth, width]);

  return (
    <div
      className={`w-full flex flex-col min-h-screen items-center pt-24 pb-12 ${bgColor}`}
    >
      <div
        className={`${containerWidth} px-4 flex flex-col items-center justify-center ${addClass}`}
      >
        {children}
        <div className="  px-4 sm:px-5"></div>
      </div>
    </div>
  );
}
