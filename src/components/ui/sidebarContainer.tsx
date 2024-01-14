import Link from 'next/link';
import React from 'react';
import NavItem from './navitem';

interface SidebarContainerProps {
  children: React.ReactNode;
}

export default function SidebarContainer({ children }: SidebarContainerProps) {
  return (
    <div className="flex gap-3 w-full">
      <div className="flex flex-col w-full sm:w-4/5 gap-3">
        <div className="border flex items-center justify-between gap-3 border-slate-500 border-r-2 border-b-2 p-3">
          <div className="flex items-center gap-3">
            <NavItem icon="all" link="/">
              All
            </NavItem>
            <NavItem icon="snippet" link="/">
              Snippets
            </NavItem>
            <NavItem icon="question" link="/">
              Questions
            </NavItem>
            <NavItem icon="resource" link="/">
              Resources
            </NavItem>
          </div>
          <div className="flex items-center gap-3">
            <NavItem icon="new" link="/">
              New
            </NavItem>
            <NavItem icon="hot" link="/">
              Hot
            </NavItem>
          </div>
        </div>
        <div className="border border-slate-500 border-r-2 border-b-2 p-3">
          {children}
        </div>
      </div>
      <div className="flex flex-col w-full sm:w-1/5 gap-3">
        <div className="border border-slate-500 border-r-2 border-b-2 py-3 px-2">
          <span className="font-medium">All</span>
        </div>
      </div>
    </div>
  );
}
