import React from 'react';

interface ContainerProps {
  width: 'full' | 'wide' | 'medium' | 'small';
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
  let containerWidth = '';

  switch (width) {
    case 'full':
      containerWidth = 'w-full';
    case 'wide':
      containerWidth = 'min-w-[1200px]';
    case 'medium':
      containerWidth = 'min-w-[768px]';
    case 'small':
      containerWidth = 'min-w-[599px]';
    default:
      containerWidth = 'min-w-[599px]';
  }

  return (
    <div className={`w-screen flex flex-col items-center ${bgColor}`}>
      <div className="pt-24 pb-12">
        <div
          className={`${containerWidth} max-x-[100vw] px-4 sm:px-5 ${addClass}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
