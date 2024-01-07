import Link from 'next/link';

interface NavItemProps {
  link: string;
  children: React.ReactNode;
}
export default function NavItem({ link, children }: NavItemProps) {
  return (
    <Link
      href={link || '/'}
      className="py-2 px-3 text-sm font-medium rounded-md hover:bg-blue-200 hover:text-blue-800  "
    >
      {children}
    </Link>
  );
}
