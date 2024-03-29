'use client';
import { useEffect, useState } from 'react';
import Button from '../button';
import { IconPencilCode, IconArrowRight } from '@tabler/icons-react';
import useSWR from 'swr';
import { Language } from '@prisma/client';
import Link from 'next/link';
import NoDataMessage from '../messages/noData';
import SidebarLoading from './sidebarLoading';

export default function Sidebar() {
  const [languages, setLanguages] = useState<Language[]>();

  const { data: languagesData, error: languagesError } =
    useSWR('/api/languages');

  const renderLanguages =
    languages && languages.length > 0 ? (
      languages.map((language) => {
        return (
          <Link
            key={language.id}
            href={`/languages/${language.name}`}
            className="text-sm group  hover:text-blue-600  py-1 flex items-center gap-2"
          >
            {language.name}
            <IconArrowRight
              width={14}
              className="opacity-0 group-hover:opacity-100 p-0 y-0"
            />
          </Link>
        );
      })
    ) : (
      <NoDataMessage message="No language yet" />
    );

  const [sidebar, setSidebar] = useState<HTMLDivElement>();
  const [style, setStyle] = useState({
    position: 'relative',
    right: sidebar?.getBoundingClientRect().right,
    top: 0,
  });
  useEffect(() => {
    languagesData && setLanguages(languagesData.languages);
    setSidebar(document.getElementById('sidebar') as HTMLDivElement);

    const fixSidebar = () => {
      if (window.scrollY > 60) {
        setStyle({ ...style, position: 'fixed', top: 70 });
      } else {
        setStyle({ ...style, position: 'retlative', top: 0 });
      }
    };
    window.addEventListener('scroll', fixSidebar);
  }, [style, setLanguages, languagesData]);
  return (
    <>
      {!languagesData && !languagesError ? (
        <SidebarLoading />
      ) : (
        <div
          className="border border-slate-500 border-r-2 border-b-2 p-3 flex flex-col gap-3 z-0"
          style={{
            right: style.right,
            top: style.top,
            position: style.position == 'fixed' ? 'fixed' : 'relative',
            width: sidebar?.clientWidth,
          }}
        >
          <Button
            size="medium"
            mode="success"
            button={false}
            addClass="border border-gray-200 bg-gray-100 flex items-center gap-2"
            link="/create"
          >
            <IconPencilCode width={16} />
            Write
          </Button>
          <hr className="mt-3 border-gray-400" />
          <div className="flex flex-col ">
            <h3 className="text-md font-medium py-1">Languages</h3>
            <Link
              href={`/`}
              className="text-sm group  hover:text-blue-600  py-1 flex items-center gap-2"
            >
              all
              <IconArrowRight
                width={14}
                className="opacity-0 group-hover:opacity-100 p-0 y-0"
              />
            </Link>
            {renderLanguages}
          </div>
        </div>
      )}
    </>
  );
}
