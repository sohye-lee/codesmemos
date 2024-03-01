'use client';
import SidebarContainer from '@/components/ui/containers/sidebarContainer';
import useStore from './store';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import PostListItem from '@/components/ui/postRelated/postLIstItem';
import { ExtendedPost } from '@/lib/types';
import Loading from './loading';
import { useSearchParams } from 'next/navigation';
import { set } from 'react-hook-form';

export default function Home() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  const { breadcrumb, setBreadcrumb } = useStore();
  const [page, setPage] = useState(1);
  const { data, error } = useSWR('/api/posts');
  const [filteredPosts, setFilteredPosts] = useState<ExtendedPost[]>(
    data?.posts
  );
  const [pagedPosts, setPagedPosts] = useState<ExtendedPost[]>(
    filteredPosts?.slice(0, 10 * page)
  );

  useEffect(() => {
    filter && setBreadcrumb(filter);

    if (!filter) {
      setFilteredPosts(data?.posts);
      setBreadcrumb('home');
    } else {
      if (filter == null || filter == 'all') {
        setFilteredPosts(data?.posts);
      } else if (filter == 'hot') {
        setFilteredPosts(
          data?.posts.sort((a: ExtendedPost, b: ExtendedPost) =>
            a.saves.length < b.saves.length ? 1 : -1
          )
        );
      } else if (filter == 'new') {
        setFilteredPosts(
          data?.posts
            .sort((a: ExtendedPost, b: ExtendedPost) =>
              a.createdAt < b.createdAt ? 1 : -1
            )
            .slice(0, 10)
        );
      } else {
        setFilteredPosts(
          data?.posts.filter((post: ExtendedPost) => post.type == filter)
        );
      }
    }
  }, [searchParams, filter, data?.posts]);
  return (
    <SidebarContainer header={true}>
      {filteredPosts
        ? filteredPosts
            // .slice(10 * (page - 1), 10 * page)
            .map((post: ExtendedPost) => (
              <PostListItem post={post} key={post.id} />
            ))
        : null}
      {!data?.posts && !error ? <Loading /> : null}
    </SidebarContainer>
  );
}
