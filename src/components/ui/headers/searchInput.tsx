'use client';
import { search } from '@/app/(guest)/search/action';
import { IconSearch } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
export default function SearchInput() {
  const { theme, setTheme } = useTheme();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState<string | null>('');

  const [bgColor, setBgColor] = useState<string | null>();
  useEffect(() => {
    theme == 'dark' ? setBgColor('') : setBgColor('bg-gray-200');

    searchParams &&
      searchParams.get('term') != '' &&
      setTerm(searchParams.get('term'));
  }, [setTerm, searchParams, setTheme, setBgColor]);

  return (
    <Suspense>
      <form action={search} className="relative py-[2px]">
        <input
          name="term"
          value={term || ''}
          onChange={(e) => setTerm(e.currentTarget.value)}
          className={`rounded border w-full h-full border-slate-300 py-2 px-3 pr-14 placeholder:text-sm ${bgColor} `}
        />
        <button
          type="submit"
          className="absolute right-2 top-[50%] -translate-y-[50%]"
        >
          <IconSearch width={16} />
        </button>
      </form>
    </Suspense>
  );
}
