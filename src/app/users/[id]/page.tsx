'use client';

import Container from '@/components/ui/containers/container';
import ContainerHeader from '@/components/ui/containers/containerHeader';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import {
  IconCode,
  IconPencilQuestion,
  IconPencil,
  IconBookmark,
  IconMessage,
} from '@tabler/icons-react';
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from 'unique-names-generator';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import PostListItem from '@/components/ui/postRelated/postLIstItem';
import { ExtendedPost, ExtendedUser } from '@/lib/types';
import Loading from '@/app/loading';

interface UsernameUpdateForm {
  username: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  const [filteredPosts, setFilteredPosts] = useState<ExtendedPost[]>([]);
  const { data, error } = useSWR(`/api/users/${id}`);
  const { data: postsData, error: postsError } = useSWR(
    `/api/users/${id}/posts`
  );
  const [posts, setPosts] = useState<ExtendedPost[]>([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UsernameUpdateForm>();
  const [user, setUser] = useState<ExtendedUser>();

  const uniqueName: string = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    length: 2,
    separator: '_',
  });
  const [popupOpen, setPopupOpen] = useState(false);

  const onValid = (validForm: UsernameUpdateForm) => {
    fetch(`/api/users/${session?.user?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validForm),
    }).then((res) => router.refresh());
    setPopupOpen(false);
  };

  const renderPosts =
    filteredPosts && filteredPosts.length > 0 ? (
      filteredPosts.map((post: ExtendedPost) => {
        return <PostListItem post={post} key={post.id} />;
      })
    ) : (
      <div className="border border-slate-500 border-r-2 border-b-2 p-3">
        <p className="text-gray-600 text-sm text-center">No post yet</p>
      </div>
    );

  useEffect(() => {
    data ? setUser(data?.user) : console.log('no data');
    postsData && setPosts(postsData?.posts);
    // setStoreState({...setStoreState, breadcrumb:'Home'});
    if (filter == 'all') {
      setFilteredPosts(
        postsData?.posts.sort((a: ExtendedPost, b: ExtendedPost) =>
          a.createdAt < b.createdAt ? 1 : -1
        )
      );
    } else if (filter == 'snippet') {
      setFilteredPosts(
        postsData?.posts
          .filter((post: ExtendedPost) => post.type == 'snippet')
          .sort((a: ExtendedPost, b: ExtendedPost) =>
            a.createdAt < b.createdAt ? 1 : -1
          )
      );
    } else if (filter == 'question') {
      setFilteredPosts(
        postsData?.posts
          .filter((post: ExtendedPost) => post.type == 'question')
          .sort((a: ExtendedPost, b: ExtendedPost) =>
            a.createdAt < b.createdAt ? 1 : -1
          )
      );
    } else if (filter == 'resource') {
      setFilteredPosts(
        postsData?.posts
          .filter((post: ExtendedPost) => post.type == 'resource')
          .sort((a: ExtendedPost, b: ExtendedPost) =>
            a.createdAt < b.createdAt ? 1 : -1
          )
      );
    } else if (filter == 'hot') {
      setFilteredPosts(
        postsData?.posts.sort((a: ExtendedPost, b: ExtendedPost) =>
          a.saves.length > b.saves.length ? 1 : -1
        )
      );
    } else if (filter == 'new') {
      setFilteredPosts(
        postsData?.posts
          .sort((a: ExtendedPost, b: ExtendedPost) =>
            a.createdAt < b.createdAt ? 1 : -1
          )
          .slice(0, 10)
      );
    } else if (filter == null) {
      setFilteredPosts(
        postsData?.posts.sort((a: ExtendedPost, b: ExtendedPost) =>
          a.createdAt < b.createdAt ? 1 : -1
        )
      );
    }
  }, [data, postsData, useSearchParams, searchParams]);

  return (
    <Container width="medium">
      {popupOpen ? (
        <div className="fixed z-100 top-0 left-0 w-screen h-screen bg-slate-600 bg-opacity-20  flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onValid)}
            className="bg-white px-4 py-5 flex flex-col gap-3 rounded-sm"
          >
            <div className="w-full flex flex-col">
              <label htmlFor="name">Set your username</label>
              <div className="p-0 m-0 relative w-full">
                <input
                  {...register('username', {
                    minLength: {
                      value: 3,
                      message: 'Min. 3 characters',
                    },
                    maxLength: {
                      value: 40,
                      message: 'Max. 40 characters',
                    },
                  })}
                  type="text"
                  placeholder="Snippet's Title"
                  className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
                  defaultValue={user?.username || uniqueName}
                />
              </div>
              {errors.username ? (
                <span className="text-danger-400 text-[14px]">
                  {errors.username.message}
                </span>
              ) : null}
            </div>
            <div className="flex justify-end gap-3">
              <Button
                size="small"
                mode="neutral"
                button={true}
                onClick={() => setPopupOpen(false)}
              >
                cancel
              </Button>
              <Button size="small" mode="black" button={true}>
                Update
              </Button>
            </div>
          </form>
        </div>
      ) : null}
      <div className="w-full flex flex-col items-center ">
        <div className=" gap-3 min-w-full lg:min-w-[899px] max-w-[899px] grid grid-cols-5">
          <div className="flex flex-col col-span-5 lg:col-span-4 order-2 lg:order-1 gap-3">
            <ContainerHeader type="default" />
            {!filteredPosts ? <Loading /> : renderPosts}
          </div>
          <div className="flex flex-col col-span-5 lg:col-span-1 order-1 lg:order-2 gap-3">
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
                <div className="text-blue-600 font-medium text-md text-center flex items-center gap-2">
                  {user?.username || user?.name}
                  <div
                    className="px-1 py-[2px] border border-blue-200 rounded-md bg-transparent hover:bg-gray-100 cursor-pointer"
                    onClick={() => setPopupOpen(true)}
                  >
                    <IconPencil width={16} />
                  </div>
                </div>
                <div className="text-gra6-600 font-medium text-sm text-center mb-3">
                  {user?.posts.length} posts
                </div>
                <div className="w-full max-w-[200px] mx-auto">
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
                    <div className="flex items-stretch gap-0 w-full">
                      <div className="flex items-center gap-1 px-1 rounded bg-blue-600 rounded-r-none w-2/3">
                        <IconMessage
                          color="#fff"
                          width="14"
                          className="m-0 p-0"
                        />
                        <span className="text-white text-[12px]">Comments</span>
                      </div>
                      <span className="text-blue-500 text-[11px] border border-blue-600 px-2 w-1/3 flex items-center rounded-r">
                        {user?.comments.length}
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
function setStoreState(arg0: any) {
  throw new Error('Function not implemented.');
}
