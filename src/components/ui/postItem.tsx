'use client';
import { ExtendedComment, ExtendedPost } from '@/lib/types';
import Link from 'next/link';
import { IconHeart, IconHeartFilled, IconMessage, IconBookmark, IconBookmarkFilled } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { FormEvent, useEffect, useState } from 'react';
import useCreate from '@/lib/useCreate';
import { signIn } from '@/app/actions';
import { CommentWithNode, dateFormat, organizeComments, sortReplies } from '@/lib/functions';
import { useForm } from 'react-hook-form';
import Button from './button';
import CommentItem from './ commentItem';
import { useRouter } from 'next/navigation';
import { Post } from '@prisma/client';
import ReplyItem from './replyItem';

interface PostItemProps {
  post: ExtendedPost;
}

interface CommentForm {
  content: string;
  userId: string;
  // postId: string;
  // parentId?: string;
}

export default function PostItem({ post }: PostItemProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: savesData } = useSWR(`/api/saves/${post.id}`);
  const { data: mySaveData } = useSWR(
    `/api/saves/${post.id}/${session?.user?.id}`
  );
  const { data: commentsData } = useSWR(`/api/saves/${post.id}/comments`);
  const [saves, setSaves] = useState(0);
  const [mySave, setMySave] = useState(false);
  const [myComments, setMyComments] = useState(post.comments);
  const [updateSave, {data:saveData, error:saveError, loading}] = useCreate(`/api/saves/${post?.id}`);
  const [createComment, {data:createCommentData, error:createCommentError, loading:createCommentLoading}] = useCreate(`/api/posts/${post?.id}/comments`);
  const {handleSubmit, register, formState: {errors}, reset} = useForm<CommentForm>();
  const [ commentLength, setCommentLength] = useState(0);

  const onCommentWrite = (e: FormEvent<HTMLInputElement>):void => {
    setCommentLength(e.currentTarget.value.length);
  }
 

  const clickSave = () => {
    if (!session?.user) {
      signIn();
    }
    if (!mySave) {
      updateSave({userId: session?.user?.id});
 
    } else {
      fetch(`/api/saves/${post.id}/${session?.user?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setMySave(true)
        }
      })
    }
  }

  // const renderComments = myComments ? myComments.map((comment) => {
  //   // return <div key={comment.id}>{comment.content}</div>
    
  //   return (
  //   <>
  //   <ReplyItem comment={comment} key={comment.id} postId={post.id} layer={comment.layer}/>
  //   <CommentItem comment={comment} key={comment.id} postId={post.id} />
  //   {/* {comment.children && comment.children.length> 0 ? comment.children.map((c) => <CommentItem comment={c} postId={post.id}/>): null} */}
    
  //   </>
  //   )
  // }): <p className="text-xs text-gray-600">No comment yet.</p>;
  const renderComments = myComments && myComments.length > 0 ? myComments.map((comment) => {
    // return <div key={comment.id}>{comment.content}</div>
    
    return (
    <>
    <CommentItem comment={comment} key={comment.id} postId={post.id} />
    {/* {comment.children && comment.children.length> 0 ? comment.children.map((c) => <CommentItem comment={c} postId={post.id}/>): null} */}
    
    </>
    )
  }): <p className="text-xs text-gray-600">No comment yet.</p>;
         

  const organizedComments = organizeComments(post.comments)
  console.log(organizedComments);

  const renderComment = (comment:CommentWithNode) => {
    return (
    <div className='pl-3'>
      <p>
        - {comment.content}
        </p> 
        {comment.replies && comment.replies.length > 0 ?
        comment.replies.map((reply) => renderComment(reply))
        :
        null  
      }
    </div>
    )
  }

  const renderOrganizedComments = organizeComments.length > 0 ? organizedComments.map((o) => {
    return renderComment(o)
  }): null;


  const onValid = (validForm: CommentForm) => {
    createComment(validForm);
    reset();
    router.push(`/posts/${post.id}`)
  }

  useEffect(() => {
    if (savesData  ) {
      setSaves(savesData.saveCount);
    }

    if (mySaveData && mySaveData.ok) {
      setMySave(true);
    } else {
      setMySave(false);
    }

    if (commentsData && commentsData.comments) {
      // setMyComments(sortReplies(commentsData.comments));
      setMyComments(commentsData.comments);
    }

    console.log(sortReplies(myComments))
 
  }, [mySaveData, savesData, setMySave, myComments, onValid, reset, createCommentData, createCommentLoading]);

  return (
    <>
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
          {/* {post.content.length > 300
            ? post.content.slice(0, 300) + '...'
            : post.content} */}
          {post.content}
        </pre>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center text-xs gap-1 cursor-pointer" onClick={clickSave}>
          {mySave ? <IconBookmarkFilled width={16} /> : <IconBookmark width="16" />}
          {saves}
        </div>
        <div className="flex items-center text-xs gap-1 cursor-pointer" onClick={clickSave}>
          <IconMessage width={16} />
          {post?.comments.length}
        </div>
      </div>
    </div>
    <div className="border border-slate-500 border-r-2 border-b-2 p-3 flex flex-col gap-3 ">
      <form onSubmit={handleSubmit(onValid)}>
      <div className="w-full flex flex-col">
        {/* <label htmlFor="name">Title</label> */}
        <div className="p-0 m-0 relative w-full">
          <input
            {...register('content', {
              required: 'This field is required',
              minLength: {
                value: 3,
                message: 'Min. 3 characters',
              },
              maxLength: {
                value: 500,
                message: 'Max. 500 characters',
              },
            })}
            type="text"
            placeholder="Write your comment"
            className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
            onChange={onCommentWrite}
          />
          <div className="absolute top-[50%] -translate-y-[50%] right-2 font-medium text-xs text-blue-600">
            {commentLength}/500
          </div>
        </div>
        {errors.content ? (
          <span className="text-danger-400 text-[14px]">
            {errors.content.message}
          </span>
        ) : null}
      </div>
      {/* <input {...register('postId')} value={post?.id} className='hidden' /> */}
      <input {...register('userId')} value={session?.user?.id} className='hidden' />
      <Button mode="success" size="small" button={true} addClass="mt-2">
        Save
      </Button>
      </form>
    
    <div>
      {renderComments}
      {renderOrganizedComments}
    </div>
    </div>

    </>
  );
}
