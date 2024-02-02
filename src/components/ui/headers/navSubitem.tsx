import Link from 'next/link';

interface NavSubItemProps {
  link: string;
  children: React.ReactNode;
  [key: string]: any;
}
export default function NavSubItem({ link, children }: NavSubItemProps) {
  return (
    <Link
      href={link || '/'}
      className="py-3 px-4 border-slate-200 border-b last:border-none text-sm hover:bg-blue-200 hover:text-blue-800  "
    >
      {children}
    </Link>
  );
}
