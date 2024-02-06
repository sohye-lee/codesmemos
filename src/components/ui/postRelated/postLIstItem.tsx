import {
  capitalize,
  dateFormat,
  getYoutubeThumbnail,
  getYoutubeVideo,
} from "@/lib/functions";
import { ExtendedPost } from "@/lib/types";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconMessage,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import PostInfo from "./postInfo";

interface PostItemProps {
  post: ExtendedPost;
}
export default function PostListItem({ post }: PostItemProps) {
  const link = post.linkType == "video" ? post.content : "";
  // const videoId = link.split("watch?v=")[1];
  // const videoThumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  return (
    <Link
      href={`/posts/${post.id}`}
      className="border cursor-pointer border-slate-500 border-r-2 border-b-2 p-3 flex flex-col gap-3"
    >
      <PostInfo post={post} />

      <h2 className="text-lg font-medium">{post.title}</h2>
      <div className="text-sm p-2 bg-gray-200">
        <pre className=" text-wrap">
          {post.content.length > 300
            ? post.content.slice(0, 300) + "..."
            : post.content}
        </pre>
        {post.linkType == "video" ? (
          <div className="w-full padding-[56.25% 0 0 0]  ">
            <Image
              src={getYoutubeThumbnail(post?.link + "")}
              alt="thumbnail"
              width={800}
              height={(800 * 9) / 16}
            />
            {/* <Image
              src={videoThumbnail}
              alt="thumbnail"
              width={800}
              height={(800 * 9) / 16}
            /> */}
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center text-xs gap-1 cursor-pointer">
          <IconBookmark width="16" />
          {post?.saves.length}
        </div>
        <div className="flex items-center text-xs gap-1 cursor-pointer">
          <IconMessage width={16} />
          {post?.comments.length}
        </div>
      </div>
    </Link>
  );
}
