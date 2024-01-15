import Link from 'next/link';
import React from 'react';
import NavItem from './navitem';
import Sidebar from './sidebar';
import ContainerHeader from './containerHeader';

interface SidebarContainerProps {
  children: React.ReactNode;
}

export default function SidebarContainer({ children }: SidebarContainerProps) {
  return (
    <div className="w-screen h-screen flex flex-col items-center pt-24 pb-12 ">
      <div className="flex gap-3 min-w-full lg:min-w-[899px] ">
        <div className="flex flex-col w-full lg:w-4/5 gap-3">
          <ContainerHeader type="default" />
          {/* <div className="border flex items-center justify-between gap-3 border-slate-500 border-r-2 border-b-2 p-3">
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
          </div> */}
          <div className="border border-slate-500 border-r-2 border-b-2 p-3">
            {children}
          </div>
        </div>
        <div className="  flex-col w-full lg:w-1/5 hidden lg:flex gap-3">
          <Sidebar />
          {/* <div className="border border-slate-500 border-r-2 border-b-2 py-3 px-2">
            <span className="font-medium">All</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
