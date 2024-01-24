'use client';
import { dateFormat } from '@/lib/functions';
import { ExtendedComment } from '@/lib/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import Button from './button';
import { IconTrash, IconEdit, IconArrowBackUp } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface CommentItemProps {
  comment: ExtendedComment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [editOpen, setEditOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [editContentLength, setEditContentLength] = useState(0);
  const onCommentEdit = (e: FormEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  };
  const editContent = () => {
    fetch(`/api/comments/${comment.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
      .then((res) => res.json())
      //   .then((data) => {
      //     setEditOpen(false);
      //     router.refresh();
      //   })
      .catch((err) => console.log(err));
  };
  const deleteComment = () => {
    try {
      fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setDeleted(data.ok);
          console.log('deleted: ', data.ok);
          if (data.ok) {
            router.refresh();
          }
        });
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (deleted) {
      router.refresh();
    }
  }, [deleted, router, setDeleted, setEditOpen]);
  return (
    <div className="w-full py-2 ">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border border-blue-600 bg-blue-200 overflow-hidden">
            {comment.user.image ? (
              <>
                <Image
                  src={comment.user.image + ''}
                  alt="avatar"
                  width="40"
                  height="40"
                  className=" object-fill"
                />
              </>
            ) : (
              <p className="text-white text-lg uppercase">
                {comment.user.name![0]}
              </p>
            )}
          </div>
          <span className="text-xs font-medium">{comment.user.name}</span>
        </div>
        <span className="text-xs font-light text-gray-600">
          {dateFormat(comment.createdAt)}
        </span>
      </div>
      {editOpen ? (
        <form onSubmit={editContent}>
          <div className="w-full flex flex-col">
            {/* <label htmlFor="name">Title</label> */}
            <div className="p-0 m-0 relative w-full">
              <input
                name="content"
                id="content"
                type="text"
                value={content}
                placeholder="Write your comment"
                className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
                onChange={onCommentEdit}
              />
              <div className="absolute top-[50%] -translate-y-[50%] right-2 font-medium text-xs text-blue-600">
                {editContentLength}/500
              </div>
            </div>
          </div>
          {/* <input {...register('postId')} value={post?.id} className='hidden' /> */}
          {/* <input {...register('userId')} value={session?.user?.id} className='hidden' /> */}
          <Button mode="success" size="small" button={true} addClass="mt-2">
            Save
          </Button>
        </form>
      ) : (
        <div className="pl-8 text-sm">{comment.content}</div>
      )}
      <div className="flex items-center justify-between">
        <IconArrowBackUp width={16} className="cursor-pointer" />
        {session?.user?.id == comment.user.id ? (
          <div className="flex items-center gap-2 pt-1 pb-2 justify-end border-b">
            <Button
              size="small"
              button={true}
              mode="save"
              onClick={() => setEditOpen(true)}
            >
              edit
            </Button>
            <Button
              size="small"
              button={true}
              mode="danger"
              onClick={deleteComment}
            >
              delete
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
