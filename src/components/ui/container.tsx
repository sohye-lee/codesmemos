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
      containerWidth = 'w-[1200px] ';
    case 'medium':
      containerWidth = 'w-[768px] ';
    case 'small':
      containerWidth = 'w-[599px] ';
    default:
      containerWidth = 'w-[599px] ';
  }

  return (
    <div
      className={`w-screen flex flex-col items-center pt-24 pb-12 ${bgColor}`}
    >
      <div
        className={`${containerWidth} max-w-screen px-4 sm:px-5 ${addClass}`}
      >
        {children}
      </div>
    </div>
  );
}
