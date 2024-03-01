import { capitalize, dateFormat } from "@/lib/functions";
import { ExtendedPost } from "@/lib/types";
import Link from "next/link";

interface PostInfoProps {
  post: ExtendedPost;
}

export default function PostInfo({ post }: PostInfoProps) {
  return (
    <div className="flex items-center flex-wrap gap-2  ">
      <div className="flex items-center gap-2">
        <Link
          href={`/?filter=${post.type}`}
          className="px-2 py-[2px] bg-gray-800 text-xs text-white "
        >
          {capitalize(post.type)}
        </Link>
        <Link
          href={`/languages/${post.languageName}`}
          className="px-2 py-[2px] bg-gray-800 text-xs text-white "
        >
          {capitalize(post.languageName)}
        </Link>
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-700">
        <span>
          Posted by
          <Link href={`/users/${post.user.id}`} className="underline ml-1">
            {post.user.username || post.user.name}
          </Link>
        </span>
        <span className="mx-1">|</span>
        <span>Created at {dateFormat(post.createdAt)}</span>
      </div>
    </div>
  );
}
