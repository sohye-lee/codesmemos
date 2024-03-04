"use client";
import Button from "@/components/ui/button";
import Container from "@/components/ui/containers/container";
import { boxClassName } from "@/lib/constants";
import React from "react";
import useSWR from "swr";

export default function AdminDashboardPage() {
  const { data: languagesData, error: languagesError } =
    useSWR("/api/languages");
  const { data: usersData, error: usersError } = useSWR("/api/users");
  const { data: postsData, error: postsError } = useSWR("/api/posts");
  const { data: commentsData, error: commentsError } = useSWR("/api/comments");
  const { data: ratingsData, error: ratingsError } = useSWR("/api/ratings");
  const { data: likesData, error: likesError } = useSWR("/api/likes");

  return (
    <Container width="medium">
      <div className="w-full grid md:grid-cols-2 gap-3">
        <div className={`${boxClassName} min-h-20`}>
          <h3 className="text-lg font-medium">Languages</h3>
          <div className="flex justify-between">
            <p className="text-sm">
              {languagesData?.languages.length} languages
            </p>
            <Button
              link="/admin/languages/new"
              mode="neutral"
              size="small"
              button={false}
            >
              Manage
            </Button>
          </div>
        </div>
        <div className={`${boxClassName} min-h-20`}>
          <h3 className="text-lg font-medium">Users</h3>
          <p className="text-sm">{usersData?.users.length} users</p>
        </div>
        <div className={`${boxClassName} min-h-20`}>
          <h3 className="text-lg font-medium">Posts</h3>
          <p className="text-sm">{postsData?.posts.length} posts</p>
        </div>
        <div className={`${boxClassName} min-h-20`}>
          <h3 className="text-lg font-medium">Comments</h3>
          <p className="text-sm">{commentsData?.comments.length} comments</p>
        </div>
      </div>
    </Container>
  );
}
