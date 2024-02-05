import { boxClassName } from '@/lib/constants';
import { ExtendedPost } from '@/lib/types';
import PostInfo from '../postRelated/postInfo';
import Link from 'next/link';

interface SimplePostItemProps {
  post: ExtendedPost;
}

export default function SimplePostItem({ post }: SimplePostItemProps) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className={`${boxClassName} border-gray-300 px-5 py-4 mt-1 col-span-1 flex-shrink-0 hover:bg-blue-100 hover:border-blue-600`}
    >
      <PostInfo post={post} />
      <h3 className="font-medium text-m3 mt-2">{post.title}</h3>
    </Link>
  );
}
