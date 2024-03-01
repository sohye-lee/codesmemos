import { IconSearch } from '@tabler/icons-react';
import React from 'react';

export default function SearchInput() {
  return (
    <div className="relative py-[2px]">
      <input className="rounded border w-full h-full border-slate-300 py-2 px-3 pr-14 placeholder:text-sm bg-gray-100" />
      <button className="absolute right-1 top-[50%] -translate-y-[50%]">
        <IconSearch width={16} />
      </button>
    </div>
  );
}
