"use client";
import Loading from "@/app/loading";
import PostListItem from "@/components/ui/postLIstItem";
import SidebarContainer from "@/components/ui/sidebarContainer";
import { boxClassName } from "@/lib/strings";
import { ExtendedPost } from "@/lib/types";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LanguageShoPage() {
  const params = useParams();
  const { name } = params;

  const { data, error } = useSWR(`/api/languages/${name}`);
  const [posts, setPosts] = useState(data?.language?.posts);

  useEffect(() => {
    data &&
      data?.language &&
      data?.language.posts &&
      setPosts(data.language.posts);
  }, [data]);

  return (
    <>
      {error && notFound()}
      <SidebarContainer
        header={true}
        type="language"
        languageName={name
          .toString()
          .replace("%20", " ")
          .replace("specialpound", "#")}
      >
        {posts && posts.length > 0 ? (
          posts.map((post: ExtendedPost) => {
            return <PostListItem post={post} key={post.id} />;
          })
        ) : (
          <div className={`${boxClassName} py-12`}>
            <p className="text-gray-600 text-sm text-center">
              {!data?.language
                ? "That language does not exist"
                : "No post yet."}
            </p>
          </div>
        )}
        {!data && !error ? <Loading /> : null}
      </SidebarContainer>
    </>
  );
}
