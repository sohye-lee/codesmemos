import { dateFormat } from "@/lib/functions";
import { ExtendedPost } from "@/lib/types";
import { IconBookmark, IconBookmarkFilled, IconMessage } from "@tabler/icons-react";
import Link from "next/link";

interface PostItemProps {
    post: ExtendedPost;
  }
export default function PostListItem({post}: PostItemProps) {
    return (
        <div className="border border-slate-500 border-r-2 border-b-2 p-3 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <h5 className="text-xs text-gray-500">
            Posted by
            <Link href={`/users/${post.user.id}`} className="underline ml-1">
              {post.user.name}
            </Link>
            <span className='mx-2'>|</span>
            <span className="mr-1">
             Created at {dateFormat(post.createdAt)}
            </span>
          </h5>
        </div>
        <h2 className="text-lg font-medium">{post.title}</h2>
        <div className="text-sm p-2 bg-gray-200">
          <pre className=" text-wrap">
            {post.content.length > 300
              ? post.content.slice(0, 300) + '...'
              : post.content}
            {/* {post.content} */}
          </pre>
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
      </div>
    )
}