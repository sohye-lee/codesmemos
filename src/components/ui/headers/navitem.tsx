import Link from "next/link";
import {
  IconCode,
  IconMessage2Question,
  IconBookmark,
  IconCodeCircle2,
  IconNews,
  IconFlame,
  IconList,
  IconHeart,
  IconSearch,
  IconHome2,
  IconMessage,
} from "@tabler/icons-react";

interface NavItemProps {
  link: string;
  icon:
    | "snippet"
    | "question"
    | "resource"
    | "language"
    | "new"
    | "hot"
    | "all"
    | "like"
    | "search"
    | "home"
    | "feedback";
  children: React.ReactNode;
  addClass?: string;
  [key: string]: any;
}

const iconSize = 16;

const iconDict = {
  snippet: <IconCode width={iconSize} />,
  question: <IconMessage2Question width={iconSize} />,
  resource: <IconBookmark width={iconSize} />,
  language: <IconCodeCircle2 width={iconSize} />,
  new: <IconNews width={iconSize} />,
  hot: <IconFlame width={iconSize} />,
  all: <IconList width={iconSize} />,
  like: <IconHeart width={iconSize} />,
  search: <IconSearch width={iconSize} />,
  home: <IconHome2 width={iconSize} />,
  feedback: <IconMessage width={iconSize} />,
};
export default function NavItem({
  link,
  icon,
  children,
  addClass,
}: NavItemProps) {
  return (
    <Link
      href={link || "/"}
      className={`flex items-center gap-1 py-2 px-3 text-sm font-medium rounded-md hover:bg-blue-200 hover:text-blue-800 ${addClass} `}
    >
      {iconDict[icon]}
      {children}
    </Link>
  );
}
