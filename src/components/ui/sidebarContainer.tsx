import React from 'react';
import Sidebar from './sidebar';
import ContainerHeader from './containerHeader';

interface SidebarContainerProps {
  children: React.ReactNode;
  header: Boolean;
}

export default function SidebarContainer({
  children,
  header,
}: SidebarContainerProps) {
  return (
    <div className="w-screen h-screen flex flex-col items-center pt-24 pb-18">
      <div className="flex gap-3 min-w-full lg:min-w-[899px] max-w-[899px]">
        <div className="flex flex-col w-full lg:w-4/5 gap-3 mb-10">
          {header && <ContainerHeader type="default" />}
          {/* <div className="border border-slate-500 border-r-2 border-b-2 p-3"> */}
          {children}
          {/* </div> */}
        </div>
        <div className="  flex-col w-full lg:w-1/5 hidden lg:flex gap-3">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
