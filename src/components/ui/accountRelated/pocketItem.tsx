import { ExtendedPocket } from '@/lib/types';
import { Post } from '@prisma/client';
import {
  IconFolder,
  IconFolderOpen,
  IconEdit,
  IconChevronDown,
  IconChevronUp,
  IconDoorExit,
  IconCheck,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import SimplePostItem from './simplePostItem';
import NoDataMessage from '../messages/noData';
import Button from '../button';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
interface EditPocketForm {
  name: string;
}

export default function PocketItem({ pocket }: { pocket: ExtendedPocket }) {
  const [pocketOpen, setPocketOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const pocketOpenHandler = () => {
    setPocketOpen((prev) => !prev);
  };

  const editOpenHandler = () => {
    setEditOpen((prev) => !prev);
  };

  const onValid = (validForm: EditPocketForm) => {
    fetch(`/api/pockets/${pocket.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validForm),
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditPocketForm>();

  return (
    <div className="w-full py-3 px-4 bg-gray-100 rounded-sm cursor-pointer">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full">
          {pocketOpen ? (
            <IconFolderOpen width={16} />
          ) : (
            <IconFolder width={16} />
          )}
          {editOpen ? (
            <form
              onSubmit={handleSubmit(onValid)}
              className="w-full flex items-stretch gap-2"
            >
              <input
                {...register('name')}
                defaultValue={pocket.name}
                className="w-full border border-gray-600 bg-white rounded focus:ring focus:ring-blue-500 py-1 px-3"
              />
              <Button size="small" button={true} mode="save">
                <IconCheck width={16} />
              </Button>
            </form>
          ) : (
            pocket.name
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="small"
            button={true}
            mode={editOpen ? 'neutral' : 'save'}
            onClick={editOpenHandler}
          >
            {editOpen ? <IconDoorExit width={16} /> : <IconEdit width={16} />}
          </Button>
          <Button
            size="small"
            button={true}
            mode="black"
            onClick={pocketOpenHandler}
          >
            {pocketOpen ? (
              <IconChevronUp width={16} />
            ) : (
              <IconChevronDown width={16} />
            )}
          </Button>
        </div>
      </div>
      {pocketOpen && (
        <div className="w-full  ">
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-3 py-3">
            {pocket.posts && pocket.posts.length > 0 ? (
              pocket.posts.map((post) => {
                return <SimplePostItem post={post} key={post.id} />;
              })
            ) : (
              <NoDataMessage
                message="No post saved in this pocket yet."
                addClass="py-3 col-span-2"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
