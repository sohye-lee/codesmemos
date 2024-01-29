import { useStore } from 'zustand';
import NavItem from './navitem';

interface ContainerHeaderProps {
  type: 'default' | 'languages' | 'topics';
}
export default function ContainerHeader({
  type = 'default',
}: ContainerHeaderProps) {
  // const {filter, setFilter} = useStore();
  return (
    <>
      {type == 'default' ? (
        <div className="border flex items-center justify-between   border-slate-500 border-r-2 border-b-2 p-3">
          <div className="flex items-center">
            <NavItem icon="all" link="/">
              All
            </NavItem>
            <NavItem icon="snippet" link="/">
              Snippets
            </NavItem>
            <NavItem icon="question" link="/">
              Questions
            </NavItem>
            <NavItem icon="resource" link="/">
              Resources
            </NavItem>
          </div>
          <div className="flex items-center  ">
            <NavItem icon="new" link="/">
              New
            </NavItem>
            <NavItem icon="hot" link="/">
              Hot
            </NavItem>
          </div>
        </div>
      ) : null}
    </>
  );
}
