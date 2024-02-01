import Link from 'next/link';
import {
  IconCode,
  IconMessage2Question,
  IconBookmark,
  IconSpeakerphone,
  IconNews,
  IconFlame,
  IconList,
  IconHeart,
  IconSearch,
  IconHome2
} from '@tabler/icons-react';

interface NavItemProps {
  link: string;
  icon:
    | 'snippet'
    | 'question'
    | 'resource'
    | 'topic'
    | 'new'
    | 'hot'
    | 'all'
    | 'like'
    | 'search'
    | 'home'
  children: React.ReactNode;
  addClass?: string;
  [key: string]: any;
}

const iconDict = {
  snippet: <IconCode width={14} />,
  question: <IconMessage2Question width={14} />,
  resource: <IconBookmark width={14} />,
  topic: <IconSpeakerphone width={14} />,
  new: <IconNews width={14} />,
  hot: <IconFlame width={14} />,
  all: <IconList width={14} />,
  like: <IconHeart width={14} />,
  search: <IconSearch width={14} />,
  home: <IconHome2 width={14} />,
};
export default function NavItem({
  link,
  icon,
  children,
  addClass,
}: NavItemProps) {
  return (
    <Link
      href={link || '/'}
      className={`flex items-center gap-1 py-2 px-3 text-sm font-medium rounded-md hover:bg-blue-200 hover:text-blue-800 ${addClass} `}
    >
      {iconDict[icon]}
      {children}
    </Link>
  );
}
