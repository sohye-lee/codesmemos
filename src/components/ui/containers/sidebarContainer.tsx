'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import ContainerHeader from './containerHeader';
import LanguageHeader from './languageHeader';

interface SidebarContainerProps {
  children: React.ReactNode;
  header: Boolean;
  type?: 'default' | 'language';
  languageName?: string;
}

export default function SidebarContainer({
  children,
  header,
  type = 'default',
  languageName,
}: SidebarContainerProps) {
  // const [sidebar, setSidebar] = useState<HTMLDivElement>();
  // const [style, setStyle] = useState({
  //   position: 'relative',
  //   right: sidebar?.getBoundingClientRect().right,
  //   top: 0,
  // });
  // useEffect(() => {
  //   setSidebar(document.getElementById('sidebar') as HTMLDivElement);

  //   const fixSidebar = () => {
  //     if (window.scrollY > 60) {
  //       setStyle({ ...style, position: 'fixed', top: 60 });
  //     } else {
  //       setStyle({ ...style, position: 'retlative', top: 0 });
  //     }
  //   };
  //   window.addEventListener('scroll', fixSidebar);
  // }, [style]);

  return (
    <div className="w-full flex flex-col items-center pt-24 pb-18">
      <div className="flex gap-3 px-4 w-full sm:max-w-full md:max-w-[899px]">
        <div className="flex flex-col w-full lg:w-4/5 gap-3 mb-10">
          {header && type == 'default' ? (
            <ContainerHeader type="default" />
          ) : null}
          {header && type == 'language' ? (
            <LanguageHeader languageName={languageName || ''} />
          ) : null}
          {/* <div className="border border-slate-500 border-r-2 border-b-2 p-3"> */}
          {children}
          {/* </div> */}
        </div>
        <div
          className="  flex-col w-full lg:w-1/5 hidden lg:flex gap-3"
          id="sidebar"
          // style={{
          //   right: style.right,
          //   top: style.top,
          //   position: style.position == 'fixed' ? 'fixed' : 'relative',
          // }}
        >
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
