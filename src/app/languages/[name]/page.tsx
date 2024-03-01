'use client';
import Loading from '@/app/loading';
import PostListItem from '@/components/ui/postRelated/postLIstItem';
import SidebarContainer from '@/components/ui/containers/sidebarContainer';
import { boxClassName } from '@/lib/constants';
import { ExtendedPost } from '@/lib/types';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useStore from '@/app/store';

export default function LanguageShoPage() {
  const { breadcrumb, setBreadcrumb } = useStore();
  const params = useParams();
  const { name } = params;

  const { data, error } = useSWR(`/api/languages/${name}`);
  const [posts, setPosts] = useState(data?.language?.posts);
  const [filteredPosts, setFilteredPosts] = useState<ExtendedPost[]>([]);
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');

  useEffect(() => {
    setBreadcrumb('languages/' + name);
    data &&
      data?.language &&
      data?.language.posts &&
      setPosts(data.language.posts);

    if (filter == 'all' || filter == null) {
      setFilteredPosts(
        data?.language.posts.sort((a: ExtendedPost, b: ExtendedPost) =>
          a.createdAt < b.createdAt ? 1 : -1
        )
      );
    } else if (filter == 'hot') {
      setFilteredPosts(
        data?.language.posts.sort((a: ExtendedPost, b: ExtendedPost) =>
          a.saves.length < b.saves.length ? 1 : -1
        )
      );
    } else if (filter == 'new') {
      setFilteredPosts(
        data?.language.posts
          .sort((a: ExtendedPost, b: ExtendedPost) =>
            a.createdAt < b.createdAt ? 1 : -1
          )
          .slice(0, 10)
      );
    } else {
      setFilteredPosts(
        data?.language.posts.sort((a: ExtendedPost, b: ExtendedPost) =>
          a.createdAt < b.createdAt ? 1 : -1
        )
      );
    }
  }, [data, setFilteredPosts]);

  return (
    <>
      {error && notFound()}
      <SidebarContainer
        header={true}
        type="language"
        languageName={name
          .toString()
          .replace('%20', ' ')
          .replace('specialpound', '#')}
      >
        {posts && posts.length > 0 ? (
          posts.map((post: ExtendedPost) => {
            return <PostListItem post={post} key={post.id} />;
          })
        ) : (
          <div className={`${boxClassName} py-12`}>
            <p className="text-gray-600 text-sm text-center">
              {!data?.language
                ? 'That language does not exist'
                : 'No post yet.'}
            </p>
          </div>
        )}
        {!data && !error ? <Loading /> : null}
      </SidebarContainer>
    </>
  );
}
