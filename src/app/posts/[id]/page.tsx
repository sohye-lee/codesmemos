'use client';
import PostItem from '@/components/ui/postItem';
import SidebarContainer from '@/components/ui/sidebarContainer';
import { ExtendedPost } from '@/lib/types';
import useCreate from '@/lib/useCreate';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

// interface PostProps {
//   post: ExtendedPost;
// }
export default function PostIndividualPage() {
  const [post, setPost] = useState<ExtendedPost>();
  const { id } = useParams();
  const { data, error } = useSWR(`/api/posts/${id}`);

  useEffect(() => {
    if (data && data.post) {
      setPost(data.post);
      console.log(data.post);
    }
  }, [setPost, data]);
  return (
    <SidebarContainer header={false}>
      {post && <PostItem post={post} />}
    </SidebarContainer>
  );
}
