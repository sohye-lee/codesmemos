import { useStore } from "zustand";
import NavItem from "../headers/navitem";
import { usePathname, useSearchParams } from "next/navigation";
import { Language } from "@prisma/client";

interface LanguageHeaderProps {
  languageName: string;
}
export default function LanguageHeader({ languageName }: LanguageHeaderProps) {
  // const {filter, setFilter} = useStore();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const currentPath = usePathname();
  return (
    <>
      <div className="border flex items-center justify-between   border-slate-500 border-r-2 border-b-2 p-3">
        <div className="flex items-center">
          <NavItem icon="snippet" link={`/languages/${languageName}`}>
            {languageName}
          </NavItem>
        </div>
        <div className="flex items-center  ">
          <NavItem icon="new" link={`${currentPath}?filter=new`}>
            New
          </NavItem>
          <NavItem icon="hot" link={`${currentPath}?filter=hot`}>
            Hot
          </NavItem>
          <NavItem icon="home" link="/">
            Home
          </NavItem>
        </div>
      </div>
    </>
  );
}
