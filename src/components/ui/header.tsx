'use client';
import Link from 'next/link';
import Profile from './profile';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import Logo from 'public/images/logo.svg';
import Image from 'next/image';
import NavItem from './navitem';
import Button from './button';
import { signIn, signOut } from '@/app/actions';
import NavSubItem from './navSubitem';
import { FormEvent, Key, useEffect, useRef, useState } from 'react';
import useStore from '@/app/store';
import { breadcrumbs, paths } from '@/lib/strings';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data: session } = useSession();
  const [openProfile, setOpenProfile] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const { breadcrumb, setBreadcrumb } = useStore();
  const dropdownCreate = useRef<HTMLDivElement>(null);
  const dropdownProfile = useRef<HTMLDivElement>(null);
  const buttonCreate = useRef<HTMLDivElement>(null);
  const buttonProfile = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState(breadcrumbs.home.url);
  const router = useRouter();

  const onChange = (e: FormEvent<HTMLSelectElement>) => {
    // router.push(breadcrumbs[e.currentTarget.value])
    router.push(breadcrumbs[e.currentTarget.value].url);
    setUrl(breadcrumbs[e.currentTarget.value].url);
    setBreadcrumb(breadcrumbs[e.currentTarget.value].name);
  };
  function assertIsNode(e: EventTarget | null): asserts e is Node {
    if (!e || !('nodeType' in e)) {
      throw new Error(`Node expected`);
    }
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      assertIsNode(e.target);

      if (
        openProfile &&
        !dropdownProfile.current?.contains(e.target) &&
        !buttonProfile.current?.contains(e.target)
      ) {
        setOpenProfile(false);
      }

      if (
        openCreate &&
        !dropdownCreate.current?.contains(e.target) &&
        !buttonCreate.current?.contains(e.target)
      ) {
        setOpenCreate(false);
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('click', handleClick);
    }
  }, [openProfile, openCreate, breadcrumb, setUrl]);

  return (
    <div className="fixed top-0 border-b  border-slate-400 left-0 w-full flex justify-center items-center bg-white">
      <div className="w-full max-w-[1600px] flex justify-between items-center   px-5 md:px-8">
        <div className="flex items-center gap-4 ">
          <Link href="/" id="logo" className="font-semibold text-sm ">
            <Image src={Logo} alt="logo" width={160} />
          </Link>
          <select
            name="breadcrumb"
            id="breadcrumb"
            className="rounded border border-slate-400 text-sm text-gray-600 py-2 px-3 "
            onChange={onChange}
          >
            <option value={'home'}>Home</option>
            <option value={'snippets'}>Snippets</option>
            <option value={'questions'}>Questions</option>
            <option value={'resources'}>Resources</option>
            <option value={'hot'}>Hot</option>
            <option value={'new'}>New</option>
            <option value={'topics'}>By Topic</option>
            <option value={'languages'}>By Language</option>
          </select>
          <NavItem
            icon="search"
            link="#"
            addClass=" bg-gray-100 border border-gray-200 py-2 text-sm text-gray-700 hover:ring-2 hover:ring-blue-400"
          >
            Search
          </NavItem>
        </div>
        {/* <div className="flex justify-center items-center ">
          <form className="border border-gray-200 roundedd bg-gray-100 py-2 px-3 text-gray-300 placeholder:text-sm placeholder:text-gray-600 flex items-center gap-3 w-full">
            <IconSearch width={20} />
            <input
              className="border-none outline-none bg-transparent"
              placeholder="search"
            />
          </form>
        </div> */}
        <div className="flex justify-end items-center gap-3 py-2">
          <div className="relative">
            <div
              ref={buttonCreate}
              onClick={() => {
                setOpenCreate((p) => !p);
                setOpenProfile(false);
              }}
              //   onClick={(e) => handleProfileClick(e)}
              className="w-10 h-10 rounded-full bg-blue-300 border border-slate-800 border-r-2  border-b-2 hover:border flex items-center justify-center"
            >
              <IconPlus size={18} />
            </div>
            {openCreate ? (
              <div
                ref={dropdownCreate}
                className="absolute right-0 top-[105%] bg-white border border-slate-300 rounded-sm flex flex-col min-w-32"
              >
                <NavSubItem link="/questions/new">Question</NavSubItem>
                <NavSubItem link="/snippets/new">Code</NavSubItem>
                <NavSubItem link="/bookmarks/new">Bookmark</NavSubItem>
              </div>
            ) : null}
          </div>
          {session?.user ? (
            <div className="relative">
              <div
                onClick={() => {
                  setOpenProfile((p) => !p);
                  setOpenCreate(false);
                }}
                // onClick={handleProfileClick}
                ref={buttonProfile}
              >
                <Profile />
              </div>
              {openProfile ? (
                <div
                  ref={dropdownProfile}
                  className="absolute right-0 top-[105%] bg-white border border-slate-300 rounded-sm flex flex-col min-w-28"
                >
                  <NavSubItem link="/account/profile">Profile</NavSubItem>
                  <NavSubItem link="/account/mystuffs">My Stuffs</NavSubItem>
                  <form action={signOut}>
                    <button className="py-3 px-4 w-full text-left border-slate-200 border-b last:border-none text-sm hover:bg-blue-200 hover:text-blue-800 ">
                      Logout
                    </button>
                  </form>
                  <button></button>
                </div>
              ) : null}
            </div>
          ) : (
            <form action={signIn}>
              <Button button={true} mode="neutral" size="small">
                Login
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
