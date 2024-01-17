'use client';

import Container from '@/components/ui/container';
import ContainerHeader from '@/components/ui/containerHeader';
import Sidebar from '@/components/ui/sidebar';
import { Post, Save, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import {
  IconCode,
  IconPencilQuestion,
  IconBookmark,
  IconBook,
} from '@tabler/icons-react';

interface ExtendedUser extends User {
  posts: Post[];
  saves: Save[];
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const { id } = useParams();
  const { data, error } = useSWR(`/api/users/${id}`);
  const [user, setUser] = useState<ExtendedUser>();

  useEffect(() => {
    data ? setUser(data?.user) : console.log('no data');
  }, [data]);
  return (
    <Container width="medium">
      <div className="w-screen h-screen flex flex-col items-center ">
        <div className="flex gap-3 min-w-full lg:min-w-[899px] ">
          <div className="flex flex-col w-full lg:w-4/5 gap-3">
            <ContainerHeader type="default" />

            <div className="border border-slate-500 border-r-2 border-b-2 p-3"></div>
          </div>
          <div className="  flex-col w-full lg:w-1/5 hidden lg:flex gap-3">
            <div>
              <div className="border border-slate-500 border-r-2 border-b-2 py-3 px-2 flex flex-col items-center">
                <div className="w-18 h-18 rounded-full border border-blue-600 bg-blue-200 overflow-hidden inline-block mx-auto mb-0">
                  {user?.image ? (
                    <>
                      <Image
                        src={user?.image + ''}
                        alt="avatar"
                        className=" object-fill"
                        width="60"
                        height="60"
                      />
                    </>
                  ) : (
                    <p className="text-white text-lg uppercase">
                      {user?.name![0]}
                    </p>
                  )}
                </div>
                <div className="text-blue-600  font-medium text-md   text-center">
                  {user?.name}
                </div>
                <div className="text-gra6-600  font-medium text-sm   text-center mb-3">
                  {user?.posts.length} posts
                </div>
                <div className="w-full">
                  <div className="flex flex-col items-center w-full gap-2">
                    <div className="flex items-stretch gap-0 w-full">
                      <div className="flex items-center gap-1 px-1 rounded bg-blue-600 rounded-r-none w-2/3">
                        <IconCode color="#fff" width="14" className="m-0 p-0" />
                        <span className="text-white text-[12px]">Snippets</span>
                      </div>
                      <span className="text-blue-500 text-[11px] border border-blue-600 px-2 w-1/3 flex items-center rounded-r">
                        {user?.posts.filter((p) => p.type === 'snippet').length}
                      </span>
                    </div>
                    <div className="flex items-stretch gap-0 w-full">
                      <div className="flex items-center gap-1 px-1 rounded bg-blue-600 rounded-r-none w-2/3">
                        <IconPencilQuestion
                          color="#fff"
                          width="14"
                          className="m-0 p-0"
                        />
                        <span className="text-white text-[12px]">
                          Questions
                        </span>
                      </div>
                      <span className="text-blue-500 text-[11px] border border-blue-600 px-2 w-1/3 flex items-center rounded-r">
                        {
                          user?.posts.filter((p) => p.type === 'question')
                            .length
                        }
                      </span>
                    </div>
                    <div className="flex items-stretch gap-0 w-full">
                      <div className="flex items-center gap-1 px-1 rounded bg-blue-600 rounded-r-none w-2/3">
                        <IconBookmark
                          color="#fff"
                          width="14"
                          className="m-0 p-0"
                        />
                        <span className="text-white text-[12px]">
                          Resources
                        </span>
                      </div>
                      <span className="text-blue-500 text-[11px] border border-blue-600 px-2 w-1/3 flex items-center rounded-r">
                        {
                          user?.posts.filter((p) => p.type === 'resource')
                            .length
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
