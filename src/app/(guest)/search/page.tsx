'use client';
import SidebarContainer from '@/components/ui/containers/sidebarContainer';
import PostListItem from '@/components/ui/postRelated/postLIstItem';
import PostLoading from '@/components/ui/postRelated/postLoading';
import { ExtendedPost } from '@/lib/types';
import useCreate from '@/lib/useCreate';
import { redirect } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}
export default function SearchPage({
  searchParams: { term },
}: SearchPageProps) {
  // if (!term) redirect('/');
  const [searchPosts, { data, loading }] = useCreate(`/api/posts/search`);

  const [searchedPosts, setSearchedPosts] = useState([]);
  useEffect(() => {
    searchPosts({ term });

    data?.ok && setSearchedPosts(data?.posts);
  }, [data?.ok, data?.posts, searchPosts, term]);
  return (
    <SidebarContainer header={false} sidebar={false}>
      <Suspense fallback={<PostLoading />}>
        <span className="px-2 py-1 bg-gray-200 text-blue-700/80 dark:bg-gray-800 dark:text-blue-400 text-sm">
          {data?.ok && data?.message}
        </span>
        {loading && <PostLoading />}
        {data?.ok &&
          searchedPosts.map((post: ExtendedPost) => {
            return <PostListItem key={post?.id!} post={post} />;
          })}
      </Suspense>
    </SidebarContainer>
  );
}
