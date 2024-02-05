import { useStore } from 'zustand';
import NavItem from '../headers/navitem';
import { usePathname, useSearchParams } from 'next/navigation';
import Breadcrumb from '../headers/breadcrumb';

interface ContainerHeaderProps {
  type: 'default' | 'languages' | 'topics';
}
export default function ContainerHeader({
  type = 'default',
}: ContainerHeaderProps) {
  // const {filter, setFilter} = useStore();
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  const currentPath = usePathname();
  return (
    <>
      {type == 'default' ? (
        <>
          <div className="border hidden lg:flex items-center justify-between   border-slate-500 border-r-2 border-b-2 p-3">
            <div className="flex items-center">
              <NavItem icon="all" link={`${currentPath}?filter=all`}>
                All
              </NavItem>
              <NavItem icon="snippet" link={`${currentPath}?filter=snippet`}>
                Snippets
              </NavItem>
              <NavItem icon="question" link={`${currentPath}?filter=question`}>
                Questions
              </NavItem>
              <NavItem icon="resource" link={`${currentPath}?filter=resource`}>
                Resources
              </NavItem>
            </div>
            <div className="flex items-center  ">
              <NavItem icon="new" link={`${currentPath}?filter=new`}>
                New
              </NavItem>
              <NavItem icon="hot" link={`${currentPath}?filter=hot`}>
                Hot
              </NavItem>
            </div>
          </div>

          <div className="flex lg:hidden">
            <Breadcrumb />
          </div>
        </>
      ) : null}
    </>
  );
}
