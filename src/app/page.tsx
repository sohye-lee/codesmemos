'use client';
import Container from '@/components/ui/container';
import SidebarContainer from '@/components/ui/sidebarContainer';
import useStore from './store';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import PostListItem from '@/components/ui/postLIstItem';
import { ExtendedPost } from '@/lib/types';

export default function Home() {
  const { breadcrumb, setBreadcrumb } = useStore();
  const [posts, setPosts] = useState([]);
  const {data} = useSWR('/api/posts');
 
 
  
  useEffect(() => {
    setBreadcrumb('Home');
  }, [setBreadcrumb]);
  return (
    <SidebarContainer header={true}>
      {data && data.posts ? 
      data.posts.map((post:ExtendedPost) => <PostListItem post={post}  />)
      :null}
 
    </SidebarContainer>
  );
}
