import { getYoutubeThumbnail } from '@/lib/functions';
import { ExtendedPost } from '@/lib/types';
import { IconBookmark, IconMessage, IconPlayerPlay } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import PostInfo from './postInfo';

interface PostItemProps {
  post: ExtendedPost;
}
export default function PostListItem({ post }: PostItemProps) {
  const link = post.linkType == 'video' ? post.content : '';
  // const videoId = link.split("watch?v=")[1];
  // const videoThumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  return (
    <div className="border   border-slate-500 border-r-2 border-b-2 p-3 flex flex-col gap-3">
      <PostInfo post={post} />

      <Link href={`/posts/${post.id}`} className="text-lg font-medium">
        {post.title}
      </Link>
      {post.content && post.content.length > 0 && (
        <div className="text-sm p-2 bg-gray-200">
          <pre className=" text-wrap">
            {post.content.length > 300
              ? post.content.slice(0, 300) + '...'
              : post.content}
          </pre>
        </div>
      )}
      {post.link && post.linkType == 'url' && (
        <Link
          href={post.link || '#'}
          className="text-sm p-2 bg-blue-100 underline hover:text-blue-600"
        >
          <span className=" text-wrap">{post.link}</span>
        </Link>
      )}
      {post.link && post.linkType == 'video' ? (
        <div className="w-full relative aspect-video overflow-hidden flex flex-col items-center justify-center">
          <Image
            src={getYoutubeThumbnail(post?.link + '')}
            alt="thumbnail"
            width={800}
            height={(800 * 9) / 16}
            className="absolute top-[50%] left-0 -translate-y-[50%] w-full z-0"
          />
          <div className="absolute top-0 left-0 h-full w-full z-10 bg-black opacity-30"></div>
          <Link
            href={post.link}
            target="_blank"
            className="relative z-20 w-16 h-16 border-2 border-white flex items-center justify-center rounded-full   hover:bg-blue-500  group"
          >
            <IconPlayerPlay
              // color="white"
              width={48}
              className="text-white "
            />
          </Link>
          {/* <Image
              src={videoThumbnail}
              alt="thumbnail"
              width={800}
              height={(800 * 9) / 16}
            /> */}
        </div>
      ) : null}
      <div className="flex items-center justify-between">
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
        <Link
          href={`/posts/${post.id}`}
          className="text-xs py-1 px-2 bg-blue-500 hover:bg-blue-400 border-none text-white"
        >
          + More
        </Link>
      </div>
    </div>
  );
}
