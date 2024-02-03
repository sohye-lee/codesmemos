import { capitalize, dateFormat } from '@/lib/functions';
import { ExtendedPost } from '@/lib/types';
import Link from 'next/link';

interface PostInfoProps {
  post: ExtendedPost;
}

export default function PostInfo({ post }: PostInfoProps) {
  return (
    <div className="flex items-center text-xs text-gray-500">
      <span className="px-2 py-[2px] bg-gray-800 text-xs text-white mr-2">
        {capitalize(post.type)}
      </span>
      <span>
        Posted by
        <Link href={`/users/${post.user.id}`} className="underline ml-1">
          {post.user.username || post.user.name}
        </Link>
      </span>
      <span className="mx-2">|</span>
      <span>Created at {dateFormat(post.createdAt)}</span>
    </div>
  );
}
