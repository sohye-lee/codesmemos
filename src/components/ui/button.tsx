// import { deleteSnippet } from '@/actions';
import Link from 'next/link';
import { ReactNode } from 'react';
import {IconRepeat} from '@tabler/icons-react';

interface ButtonProps {
  button: boolean;
  mode: 'danger' | 'success' | 'save' | 'neutral' | 'black';
  size?: 'small' | 'medium' | 'large';
  addClass?: string;
  loading?: boolean | false;
  link?: string;
  deleteId?: number;
  deleteType?: 'snippets' | 'questions' | 'resources';
  children: ReactNode;
  [key: string]: any;
}

export default function Button({
  button,
  text,
  mode,
  size,
  addClass,
  loading = false,
  link,
  onclick,
  children,
  deleteId,
  deleteType,
  ...rest
}: ButtonProps) {
  let btnSize = '';
  switch (size) {
    case 'large':
      btnSize = 'px-8 py-3 text-lg';
      break;
    case 'small':
      btnSize = 'px-2 py-1 text-xs';
      break;
    case 'medium':
      btnSize = 'px-5 py-2 text-sm';
      break;
    default:
      btnSize = 'px-5 py-2 text-sm';
  }

  let btnMode = '';
  switch (mode) {
    case 'danger':
      btnMode = 'bg-red-400 hover:bg-red-300';
      break;
    case 'success':
      btnMode = 'bg-purple-300 hover:bg-purple-200';
      break;
    case 'save':
      btnMode = 'bg-emerald-400 hover:bg-emerald-300';
      break;
    case 'neutral':
      btnMode = 'bg-slate-100 hover:bg-slate-200';
      break;
    default:
      btnMode = 'bg-black hover:bg-gray-800 text-white';
  }

  return (
    <>
      {button ? (
        <button
          type="submit"
          className={`rounded-md  border border-slate-800 border-r-2  border-b-2 hover:border  ${btnMode} ${btnSize} ${addClass}`}
          {...rest}
        >
          {loading? <IconRepeat width={16} className=' animate-spin' />: children}
        </button>
      ) : (
        <Link
          href={link || '/'}
          className={`rounded-md  border border-slate-800 border-r-2  border-b-2 hover:border  ${btnMode} ${btnSize} ${addClass}`}
          {...rest}
        >
          {loading? <IconRepeat width={16} className=' animate-spin' />: children}
          {/* {children} */}
        </Link>
      )}
    </>
  );
}
