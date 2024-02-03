'use client';
import Link from 'next/link';
import Profile from './profile';
import { IconPlus, IconDotsVertical } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import Logo from 'public/images/logo.svg';
import Image from 'next/image';
import NavItem from './navitem';
import Button from '../button';
import { signIn, signOut } from '@/app/actions';
import NavSubItem from './navSubitem';
import { FormEvent, Key, useEffect, useRef, useState } from 'react';
import useStore from '@/app/store';
import { breadcrumbs, paths } from '@/lib/constants';
import { usePathname, useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import MobileHeader from './mobileHeader';
import Breadcrumb from './breadcrumb';

export default function Header() {
  const { data: session, status } = useSession();
  const [openProfile, setOpenProfile] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const { storeState, setStoreState } = useStore();
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
    setStoreState({
      ...storeState,
      breadcrumb: breadcrumbs[e.currentTarget.value].name,
    });
  };
  function assertIsNode(e: EventTarget | null): asserts e is Node {
    if (!e || !('nodeType' in e)) {
      throw new Error(`Node expected`);
    }
  }

  const handleMobileNav = () => {
    setOpenMobileNav((prev) => !prev);
    console.log(openMobileNav);
  };

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
  }, [openProfile, openCreate, storeState, setUrl]);

  return (
    <>
      <div className="fixed top-0 border-b  border-slate-400 left-0 w-full flex justify-center items-center bg-white">
        <div className="w-full max-w-[1600px] flex justify-between items-center   px-5 md:px-8">
          <div className="flex items-center gap-4 ">
            <Link href="/" id="logo" className="font-semibold text-sm ">
              <Image src={Logo} alt="logo" width={160} />
            </Link>
            <div className="hidden lg:block ">
              <Breadcrumb />
            </div>

            {/* <select
              name="breadcrumb"
              id="breadcrumb"
              className="hidden lg:block rounded border border-slate-400 text-sm text-gray-600 py-2 px-3 "
              onChange={onChange}
            >
              <option value={"home"}>Home</option>
              <option value={"snippet"}>Snippets</option>
              <option value={"question"}>Questions</option>
              <option value={"resource"}>Resources</option>
              <option value={"hot"}>Hot</option>
              <option value={"new"}>New</option>
              <option value={"languages"}>By Language</option>
              <option value={"feedback"}>Feedback</option>
            </select> */}

            <NavItem
              icon="search"
              link="#"
              addClass="hidden lg:flex bg-gray-100 border border-gray-200 py-2 text-sm text-gray-700 hover:ring-2 hover:ring-blue-400"
            >
              Search
            </NavItem>
          </div>

          <div className="flex justify-end items-center gap-3 py-2">
            <div className="relative">
              <div
                ref={buttonCreate}
                onClick={() => {
                  setOpenCreate((p) => !p);
                  setOpenProfile(false);
                }}
                className="w-10 h-10 rounded-full bg-blue-300 border border-slate-800 border-r-2  border-b-2 hover:border flex items-center justify-center"
              >
                <IconPlus size={18} />
              </div>
              {openCreate ? (
                <div
                  ref={dropdownCreate}
                  className="absolute right-0 top-[105%] bg-white border border-slate-300 rounded-sm flex flex-col min-w-32"
                >
                  <NavSubItem link="/create?type=snippet">Snippet</NavSubItem>
                  <NavSubItem link="/create?type=question">Question</NavSubItem>
                  <NavSubItem link="/create?type=resource">Resource</NavSubItem>
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
                  <Profile nameShow={false} />
                </div>
                {openProfile ? (
                  <div
                    ref={dropdownProfile}
                    className="absolute right-0 top-[105%] bg-white border border-slate-300 rounded-sm flex flex-col min-w-28"
                  >
                    <NavSubItem link={`/users/${session?.user?.id}`}>
                      Profile
                    </NavSubItem>
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
            <div className="block lg:hidden">
              <IconDotsVertical
                height={20}
                onClick={() => setOpenMobileNav(true)}
              />
            </div>
          </div>
        </div>
      </div>
      {openMobileNav && <MobileHeader handleMobileNav={handleMobileNav} />}
    </>
  );
}
