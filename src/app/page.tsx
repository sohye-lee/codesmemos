"use client";
import SidebarContainer from "@/components/ui/containers/sidebarContainer";
import useStore from "./store";
import { useEffect, useState } from "react";
import useSWR from "swr";
import PostListItem from "@/components/ui/postRelated/postLIstItem";
import { ExtendedPost } from "@/lib/types";
import Loading from "./loading";
import { useSearchParams } from "next/navigation";
import PageCounter from "@/components/ui/postRelated/pageCounter";
import PostLoading from "@/components/ui/postRelated/postLoading";

export default function Home() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const { breadcrumb, setBreadcrumb } = useStore();

  const [page, setPage] = useState(1);
  const { data, error } = useSWR("/api/posts");

  const [filteredPosts, setFilteredPosts] = useState<ExtendedPost[]>(
    data?.posts
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(
    Math.ceil(filteredPosts?.length / 10)
  );

  useEffect(() => {
    filter && setBreadcrumb(filter);

    if (filteredPosts?.length > 0) {
      setPageCount(Math.ceil(filteredPosts?.length / 10));
    }

    if (!filter || filter == null || filter == "all") {
      setFilteredPosts(
        data?.posts.sort((a: ExtendedPost, b: ExtendedPost) =>
          a.createdAt < b.createdAt ? 1 : -1
        )
      );
      setBreadcrumb("home");
    }

    if (filter == "hot") {
      setFilteredPosts(
        data?.posts.sort((a: ExtendedPost, b: ExtendedPost) =>
          a.saves.length < b.saves.length ? 1 : -1
        )
      );
    }
    if (filter == "new") {
      setFilteredPosts(
        data?.posts.sort((a: ExtendedPost, b: ExtendedPost) =>
          a.createdAt < b.createdAt ? 1 : -1
        )
      );
    }
    if (filter == "snippet" || filter == "resource" || filter == "question") {
      setFilteredPosts(
        data?.posts
          .filter((post: ExtendedPost) => post.type == filter)
          .sort((a: ExtendedPost, b: ExtendedPost) =>
            a.createdAt < b.createdAt ? 1 : -1
          )
      );
    }
  }, [
    searchParams,
    filter,
    data?.posts,
    pageCount,
    setBreadcrumb,
    filteredPosts?.length,
    currentPage,
    setCurrentPage,
  ]);

  return (
    <SidebarContainer header={true}>
      {!data?.posts && !error ? (
        <PostLoading />
      ) : filteredPosts ? (
        filteredPosts
          .slice(10 * (currentPage - 1), 10 * currentPage)
          .map((post: ExtendedPost) => (
            <PostListItem post={post} key={post.id} />
          ))
      ) : null}
      {filteredPosts?.length > 10 && (
        <PageCounter
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          maxPage={pageCount}
        />
      )}
    </SidebarContainer>
  );
}
