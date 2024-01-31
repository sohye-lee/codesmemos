'use client';
import SidebarContainer from '@/components/ui/sidebarContainer';
import useStore from './store';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import PostListItem from '@/components/ui/postLIstItem';
import { ExtendedPost } from '@/lib/types';
import Loading from './loading';
import {  useSearchParams } from 'next/navigation';

export default function Home() {
  const { storeState, setStoreState } = useStore();
  const [filteredPosts, setFilteredPosts] = useState<ExtendedPost[]>([]);
  const { data, error } = useSWR('/api/posts');
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter')

  useEffect(() => {
    data?.posts && setFilteredPosts(data.posts);
    setStoreState({...storeState, breadcrumb:'Home'});
    if (filter == 'all') {
      setFilteredPosts(data?.posts);
    } else if (filter == 'snippet') {
      setFilteredPosts(data?.posts.filter((post:ExtendedPost) => post.type =='snippet'))
    } else if (filter == 'question') {
      setFilteredPosts(data?.posts.filter((post:ExtendedPost) => post.type =='question'))
    } else if (filter == 'resource') {
      setFilteredPosts(data?.posts.filter((post:ExtendedPost) => post.type =='resource'))
    } else if (filter == 'hot') {
      setFilteredPosts(data?.posts.sort((a:ExtendedPost,b:ExtendedPost) => a.saves.length < b.saves.length ? 1 : -1));
    } else if (filter == 'new') {
      setFilteredPosts(data?.posts.sort((a:ExtendedPost,b:ExtendedPost) => a.createdAt < b.createdAt ? 1 : -1).slice(0,10))
    } else if (filter == null) {
      setFilteredPosts(data?.posts)
    }
  }, [setStoreState, searchParams, data?.posts, filter]);
  return (
    <SidebarContainer header={true}>
      {filteredPosts
        ? filteredPosts.map((post: ExtendedPost) => (
            <PostListItem post={post} key={post.id} />
          ))
        : null}
        {!data?.posts && !error ? <Loading /> : null}
    </SidebarContainer>
  );
}
