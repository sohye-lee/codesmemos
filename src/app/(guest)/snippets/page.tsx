"use client";
import SidebarContainer from "@/components/ui/containers/sidebarContainer";
import useStore from "../../store";
import { useEffect, useState } from "react";
import useSWR from "swr";
import PostListItem from "@/components/ui/postRelated/postLIstItem";
import { ExtendedPost } from "@/lib/types";
import Loading from "../../loading";
import { useSearchParams } from "next/navigation";

export default function SnippetsPage() {
  const { setBreadcrumb } = useStore();
  const [page, setPage] = useState(1);
  const { data, error } = useSWR("/api/posts");
  const [filteredPosts, setFilteredPosts] = useState<ExtendedPost[]>(
    data?.posts
      ? data?.posts
          .filter((post: ExtendedPost) => post.type == "snippet")
          .sort((a: ExtendedPost, b: ExtendedPost) =>
            a.createdAt < b.createdAt ? 1 : -1
          )
      : []
  );
  const [pagedPosts, setPagedPosts] = useState<ExtendedPost[]>(
    filteredPosts?.slice(0, 10 * page)
  );
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  useEffect(() => {
    data &&
      data?.posts &&
      setFilteredPosts(
        data?.posts
          .filter((post: ExtendedPost) => post.type == "snippet")
          .sort((a: ExtendedPost, b: ExtendedPost) =>
            a.createdAt < b.createdAt ? 1 : -1
          )
      );

    setBreadcrumb("Home");

    // filteredPosts?.length > 0 &&
    //   setPagedPosts(filteredPosts.slice(10 * (page - 1), 10 * page));
  }, [
    searchParams,
    data?.posts,
    filter,
    setFilteredPosts,
    // pagedPosts,
    filteredPosts,
    // page,
    setBreadcrumb,
  ]);
  return (
    <SidebarContainer header={true}>
      {pagedPosts
        ? pagedPosts
            // .slice(10 * (page - 1), 10 * page)
            .map((post: ExtendedPost) => (
              <PostListItem post={post} key={post.id} />
            ))
        : null}
      {!data?.posts && !error ? <Loading /> : null}
    </SidebarContainer>
  );
}
