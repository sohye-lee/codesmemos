import React from "react";

interface ContainerProps {
    width: 'full' | 'wide' | 'medium' | 'small';
    children: React.ReactNode;
}

export default function Container({width, children}: ContainerProps) {
    let containerWidth = '';

    switch (width) {
        case ('full'):
            containerWidth = 'w-full';
        case ('wide'):
            containerWidth = 'min-x-[1200px]'
        case ('medium'):
            containerWidth = 'min-x-[768px]'
        case ('small'):
            containerWidth = 'min-x-[599px]'
        default:
            containerWidth = 'min-x-[599px]';
    }

    return (
        <div className="w-full flex flex-col align-center">
            <div className="my-8">
                <div className={`${containerWidth} max-x-[100vw] px-4 sm:px-5`}>
                    {children}
                </div>
            </div>
        </div>
    )
}