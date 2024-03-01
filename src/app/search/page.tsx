"use client";
import Container from "@/components/ui/containers/container";
import SidebarContainer from "@/components/ui/containers/sidebarContainer";
import PostItem from "@/components/ui/postRelated/postItem";
import PostListItem from "@/components/ui/postRelated/postLIstItem";
import PostLoading from "@/components/ui/postRelated/postLoading";
import { ExtendedPost } from "@/lib/types";
import useCreate from "@/lib/useCreate";
import { redirect } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}
export default function SearchPage({
  searchParams: { term },
}: SearchPageProps) {
  if (!term) redirect("/");
  const [searchPosts, { data, error, loading }] =
    useCreate(`/api/posts/search`);

  const [searchedPosts, setSearchedPosts] = useState([]);
  useEffect(() => {
    searchPosts({ term });

    data?.ok && setSearchedPosts(data?.posts);
  }, [data?.ok, term]);
  return (
    <SidebarContainer header={false} sidebar={false}>
      <Suspense fallback={<PostLoading />}>
        {data?.ok && data?.message}
        {loading && <PostLoading />}
        {data?.ok &&
          searchedPosts.map((post: ExtendedPost) => {
            return <PostListItem key={post?.id!} post={post} />;
          })}
      </Suspense>
    </SidebarContainer>
  );
}
