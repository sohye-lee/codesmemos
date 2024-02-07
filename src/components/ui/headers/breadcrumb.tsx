'use client';

'use client';
import useStore from '@/app/store';
import { breadcrumbs } from '@/lib/constants';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect } from 'react';

export default function Breadcrumb() {
  const { breadcrumb, setBreadcrumb } = useStore();

  const router = useRouter();

  const onChange = (e: FormEvent<HTMLSelectElement>) => {
    router.push(breadcrumbs[e.currentTarget.value].url);
    setBreadcrumb(e.currentTarget.value);
  };
  useEffect(() => {}, [router, breadcrumb]);
  return (
    <select
      name="breadcrumb"
      id="breadcrumb"
      className="rounded border border-slate-400 text-sm text-gray-600 py-2 px-3 "
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
      <option value={'create'}>Create</option>
      <option value={'feedback'}>Feedback</option>
    </select>
  );
}
