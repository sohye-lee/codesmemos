"use client";
import { search } from "@/app/search/action";
import { IconSearch } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import React from "react";
export default function SearchInput() {
  const searchParams = useSearchParams();
  const term = searchParams.get("term");

  return (
    <form action={search} className="relative py-[2px]">
      <input
        name="term"
        defaultValue={term || ""}
        className="rounded border w-full h-full border-slate-300 py-2 px-3 pr-14 placeholder:text-sm bg-gray-100"
      />
      <button
        type="submit"
        className="absolute right-2 top-[50%] -translate-y-[50%]"
      >
        <IconSearch width={16} />
      </button>
    </form>
  );
}
