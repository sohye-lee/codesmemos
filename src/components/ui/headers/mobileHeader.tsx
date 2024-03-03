'use client';
import { paths } from '@/lib/constants';
import NavItem from './navitem';
import { IconArrowRight } from '@tabler/icons-react';
import useSWR from 'swr';
import { FormEvent, useEffect, useState } from 'react';
import { Language } from '@prisma/client';
import { useRouter } from 'next/navigation';
import SearchInput from './searchInput';
import { useTheme } from 'next-themes';

interface MobileHeaderProps {
  handleMobileNav: () => void;
}

export default function MobileHeader({ handleMobileNav }: MobileHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [bgColor, setBgColor] = useState<string | null>();
  const [selectBgColor, setSelectBgColor] = useState<string | null>();
  const router = useRouter();
  const { data, error } = useSWR('/api/languages');
  const [languages, setLanguages] = useState([]);

  const renderLanguageOptions =
    languages &&
    languages.map((language: Language) => {
      return (
        <option key={language.id} value={language.name}>
          {language.name}
        </option>
      );
    });

  const onChangeSelect = (e: FormEvent<HTMLSelectElement>) => {
    router.push('/languages/' + e.currentTarget.value);
    handleMobileNav();
  };
  useEffect(() => {
    data && data.languages && setLanguages(data.languages);
    theme == 'light' ? setBgColor('bg-white') : setBgColor('bg-black');
    theme == 'light'
      ? setSelectBgColor('bg-gray-200')
      : setSelectBgColor('bg-gray-800');
  }, [data, setLanguages, setBgColor, theme]);
  return (
    <nav
      className={` ${bgColor} fixed top-0 right-0 py-8 px-3  z-50 min-w-[240px] shadow-sm h-screen border-l border-gray-300`}
    >
      <div className="flex flex-col gap-1">
        <div
          onClick={handleMobileNav}
          className="p-2 bg-gray-400 opacity-50 hover:opacity-80 w-10 h-10 flex items-center justify-center mb-3"
        >
          <IconArrowRight width={24} color="#fff" />
        </div>
        <SearchInput />
        {/* <NavItem
          icon="search"
          link="#"
          addClass=" bg-gray-100 border border-gray-200 py-2 text-sm text-gray-700 hover:ring-2 hover:ring-blue-400"
        >
          Search
        </NavItem> */}
        <NavItem link="/" icon={'home'} onClick={handleMobileNav}>
          Home
        </NavItem>
        <NavItem
          link={paths.client.get.snippets()}
          icon={'snippet'}
          onClick={handleMobileNav}
        >
          Snippets
        </NavItem>
        <NavItem
          link={paths.client.get.questions()}
          icon={'question'}
          onClick={handleMobileNav}
        >
          Questions
        </NavItem>
        <NavItem
          link={paths.client.get.resources()}
          icon={'resource'}
          onClick={handleMobileNav}
        >
          Resources
        </NavItem>
        <NavItem
          link={paths.client.get.hot()}
          icon={'hot'}
          onClick={handleMobileNav}
        >
          Hot
        </NavItem>
        <NavItem
          link={paths.client.get.new()}
          icon={'new'}
          onClick={handleMobileNav}
        >
          New
        </NavItem>
        {/* <NavItem
          link={paths.client.get.languages()}
          icon={"language"}
          onClick={handleMobileNav}
        >
          All Languages
        </NavItem> */}
        <NavItem
          link={paths.client.get.feedback()}
          icon={'feedback'}
          onClick={handleMobileNav}
        >
          Feedback
        </NavItem>
        <hr />
        <h3 className="font-medium text-sm p-2">Languages</h3>
        <select
          className={`px-3 py-2 border-gray-300 text-sm ${selectBgColor}`}
          onChange={onChangeSelect}
        >
          <option selected disabled>
            select
          </option>
          {renderLanguageOptions}
        </select>
        {/* {renderLanguage} */}
      </div>
    </nav>
  );
}
