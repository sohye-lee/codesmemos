import React from 'react';
import Sidebar from './sidebar';
import ContainerHeader from './containerHeader';
import LanguageHeader from './languageHeader';
import { Language } from '@prisma/client';
import { ExtendedPost } from '@/lib/types';

// interface ExtendedLanguage extends Language {
//   posts: ExtendedPost[];
// }

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
  return (
    <div className="w-screen min-h-screen flex flex-col items-center pt-24 pb-18">
      <div className="flex gap-3 min-w-full lg:min-w-[899px] max-w-[899px]">
        <div className="flex flex-col w-full lg:w-4/5 gap-3 mb-10">
          {header && type=='default' ? <ContainerHeader type="default" />: null}
          {header && type=='language' ? <LanguageHeader languageName={languageName || ''} />: null}
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
