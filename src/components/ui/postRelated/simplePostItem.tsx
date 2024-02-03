import { boxClassName } from '@/lib/constants';
import { ExtendedPost } from '@/lib/types';
import PostInfo from './postInfo';
import Link from 'next/link';

interface SimplePostItemProps {
  post: ExtendedPost;
}

export default function SimplePostItem({ post }: SimplePostItemProps) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className={`${boxClassName} border-gray-300 px-5 py-4 mt-3 w-1/2 flex-shrink-0`}
    >
      <PostInfo post={post} />
      <h3 className="font-medium text-m3 mt-2">{post.title}</h3>
    </Link>
  );
}
