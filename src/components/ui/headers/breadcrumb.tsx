'use client';
import useStore from '@/app/store';
import { breadcrumbs } from '@/lib/constants';
import { Language } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import useSWR from 'swr';
import Button from '../button';
import { IconArrowRight } from '@tabler/icons-react';
import { useTheme } from 'next-themes';

export default function Breadcrumb() {
  const { theme, setTheme } = useTheme();
  const [selectBgColor, setSelectBgColor] = useState<string | null>();
  const { breadcrumb, setBreadcrumb } = useStore();
  const { data, error } = useSWR('/api/languages');
  const [languages, setLanguages] = useState<Language[]>([]);

  const router = useRouter();

  const onChange = (e: FormEvent<HTMLSelectElement>) => {
    e.currentTarget.value.includes('languages/')
      ? router.push('/' + e.currentTarget.value)
      : router.push(breadcrumbs[e.currentTarget.value].url);
    setBreadcrumb(e.currentTarget.value);
  };

  const onClick = () => {
    breadcrumb.includes('languages/')
      ? router.push('/' + breadcrumb)
      : router.push(breadcrumbs[breadcrumb].url!);
  };

  useEffect(() => {
    theme == 'light'
      ? setSelectBgColor('border-gray-300 bg-gray-200 text-gray-600')
      : setSelectBgColor('border-gray-600 bg-gray-800');
    data?.ok && setLanguages(data?.languages);
  }, [
    router,
    breadcrumb,
    setBreadcrumb,
    data?.ok,
    data?.languages,
    theme,
    setSelectBgColor,
  ]);
  return (
    <div className="flex items-stretch gap-2">
      <select
        name="breadcrumb"
        id="breadcrumb"
        className={`rounded border  text-sm  py-2 px-3 ${selectBgColor}`}
        onChange={onChange}
        value={breadcrumb}
      >
        <option value={'home'}>Home</option>
        <option value={'snippet'}>Snippets</option>
        <option value={'question'}>Questions</option>
        <option value={'resource'}>Resources</option>
        <option value={'hot'}>Hot</option>
        <option value={'new'}>New</option>
        <option value={'languages'}>By Language</option>
        {languages &&
          languages.map((language) => (
            <option key={language.id} value={'languages/' + language.name}>
              - {language.name}
            </option>
          ))}
        <option value={'create'}>Create</option>
        <option value={'feedback'}>Feedback</option>
      </select>
      <Button size="small" mode="success" button={true} onClick={onClick}>
        <IconArrowRight width={20} />
      </Button>
    </div>
  );
}
