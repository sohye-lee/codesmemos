import { ExtendedPocket } from '@/lib/types';
import { Post } from '@prisma/client';
import { IconFolder, IconFolderOpen } from '@tabler/icons-react';
import { useState } from 'react';
import SimplePostItem from '../postRelated/simplePostItem';
import NoDataMessage from '../messages/noData';

// function PostInPocket({ post }: { post: ExtendedPost }) {
//   return <div className="px-3 py-2 border border-gray-400">{post.title}</div>;
// }
export default function PocketItem({ pocket }: { pocket: ExtendedPocket }) {
  const [pocketOpen, setPocketOpen] = useState<boolean>(false);

  const onClick = () => {
    setPocketOpen((prev) => !prev);
  };

  return (
    <div
      className="w-full py-3 px-4 bg-gray-100 rounded-sm cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {pocketOpen ? <IconFolderOpen width={16} /> : <IconFolder width={16} />}
        {pocket.name}
      </div>
      {pocketOpen && (
        <div className="w-full overflow-hidden ">
          <div className="flex items-stretch gap-2 overflow-x-auto py-3">
            {pocket.posts && pocket.posts.length > 0 ? (
              pocket.posts.map((post) => {
                return <SimplePostItem post={post} key={post.id} />;
              })
            ) : (
              <NoDataMessage
                message="No post saved in this pocket yet."
                addClass="py-3"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
