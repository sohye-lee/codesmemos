import React from 'react';

interface FormContainerProps {
  title?: string;
  children: React.ReactNode;
}
export default function FormContainer({ title, children }: FormContainerProps) {
  return (
    <div className="w-full border border-slate-500 border-r-2 border-b-2 p-3">
      <h1 className="text-xl font-medium mb-3">{title}</h1>
      {children}
    </div>
  );
}
