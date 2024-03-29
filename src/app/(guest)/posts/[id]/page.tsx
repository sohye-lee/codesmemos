'use client';
import PostItem from '@/components/ui/postRelated/postItem';
import { Suspense } from 'react';
import SidebarContainer from '@/components/ui/containers/sidebarContainer';
import { ExtendedPost } from '@/lib/types';
import useCreate from '@/lib/useCreate';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Loading from '@/app/loading';
import PostLoading from '@/components/ui/postRelated/postLoading';

export default function PostIndividualPage() {
  const [post, setPost] = useState<ExtendedPost>();
  const router = useRouter();
  const { id } = useParams();
  const { data, error } = useSWR(`/api/posts/${id}`);

  useEffect(() => {
    if (data && data.post) {
      setPost(data.post);
    }
  }, [setPost, data, router]);
  return (
    <SidebarContainer header={false}>
      {!data && !error ? (
        <PostLoading />
      ) : post ? (
        <PostItem post={post} />
      ) : null}
    </SidebarContainer>
  );
}
