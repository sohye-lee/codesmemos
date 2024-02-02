import { paths } from "@/lib/constants";
import NavItem from "./navitem";
import { IconArrowRight } from "@tabler/icons-react";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { Language } from "@prisma/client";
import { useRouter } from "next/navigation";

interface MobileHeaderProps {
  handleMobileNav: () => void;
}

export default function MobileHeader({ handleMobileNav }: MobileHeaderProps) {
  const { data, error } = useSWR("/api/languages");
  const [languages, setLanguages] = useState([]);

  const renderLanguage = languages
    ? languages.map((language: Language) => {
        return (
          <NavItem
            key={language.id}
            icon="language"
            link={`/languages/${language.name}`}
          >
            {language.name}
          </NavItem>
        );
      })
    : null;
  useEffect(() => {
    data && data.languages && setLanguages(data.languages);
  }, [data, setLanguages]);
  return (
    <nav className="fixed top-0 right-0 py-8 px-3 bg-white z-50 min-w-[240px] shadow-sm h-screen border-l border-gray-300">
      <div className="flex flex-col gap-1">
        <div
          onClick={handleMobileNav}
          className="p-2 bg-gray-400 opacity-50 hover:opacity-80 w-10 h-10 flex items-center justify-center mb-3"
        >
          <IconArrowRight width={24} color="#fff" />
        </div>
        <NavItem
          icon="search"
          link="#"
          addClass=" bg-gray-100 border border-gray-200 py-2 text-sm text-gray-700 hover:ring-2 hover:ring-blue-400"
        >
          Search
        </NavItem>
        <NavItem link="/" icon={"home"}>
          Home
        </NavItem>
        <NavItem
          link={paths.client.get.snippets()}
          icon={"snippet"}
          onClick={handleMobileNav}
        >
          Snippets
        </NavItem>
        <NavItem
          link={paths.client.get.questions()}
          icon={"question"}
          onClick={handleMobileNav}
        >
          Questions
        </NavItem>
        <NavItem
          link={paths.client.get.resources()}
          icon={"resource"}
          onClick={handleMobileNav}
        >
          Resources
        </NavItem>
        <NavItem
          link={paths.client.get.hot()}
          icon={"hot"}
          onClick={handleMobileNav}
        >
          Hot
        </NavItem>
        <NavItem
          link={paths.client.get.new()}
          icon={"new"}
          onClick={handleMobileNav}
        >
          New
        </NavItem>
        <NavItem
          link={paths.client.get.languages()}
          icon={"language"}
          onClick={handleMobileNav}
        >
          All Languages
        </NavItem>
        <NavItem
          link={paths.client.get.feedback()}
          icon={"feedback"}
          onClick={handleMobileNav}
        >
          Feedback
        </NavItem>
        <hr />
        <h3 className="font-medium text-sm p-2">By Language</h3>
        {renderLanguage}
      </div>
    </nav>
  );
}
