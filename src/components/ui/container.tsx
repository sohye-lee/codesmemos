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
      setContainerWidth('min-w-[1199px]');
    } else if (width == 'medium') {
      setContainerWidth('min-w-[899px]');
    } else if (width == 'small') {
      setContainerWidth('min-w-[599px]');
    }
  }, [setContainerWidth, width]);

  return (
    <div
      className={`w-screen flex flex-col min-h-screen items-center pt-24 pb-12 ${bgColor} `}
    >
      <div
        className={` ${containerWidth}  max-w-screen w-auto flex flex-col items-center justify-center  ${addClass}`}
      >
        {children}
        <div className="  px-4 sm:px-5"></div>
      </div>
    </div>
  );
}
