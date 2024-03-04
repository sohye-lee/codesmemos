"use client";
import { CommentWithNode, ExtendedPocket, ExtendedPost } from "@/lib/types";
import {
  IconMessage,
  IconBookmark,
  IconBookmarkFilled,
  IconFolder,
  IconPlus,
  IconCheck,
  IconEdit,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { FormEvent, Suspense, useEffect, useState } from "react";
import useCreate from "@/lib/useCreate";
import { signIn } from "@/lib/actions";
import { getYoutubeVideo, organizeComments } from "@/lib/functions";
import { useForm } from "react-hook-form";
import Button from "../button";
import CommentItem from "./commentItem";
import { useRouter } from "next/navigation";
import PostInfo from "./postInfo";
import NoDataMessage from "../messages/noData";
import Link from "next/link";
import PostLoading from "./postLoading";
import { useTheme } from "next-themes";

interface PostItemProps {
  post: ExtendedPost;
}

interface CommentForm {
  content: string;
  userId: string;
}

export default function PostItem({ post }: PostItemProps) {
  const { theme, setTheme } = useTheme();
  const [bgColor, setBgColor] = useState<string>();
  const router = useRouter();
  const { data: session } = useSession();
  const { data: savesData } = useSWR(`/api/saves/${post.id}`);
  const { data: mySaveData } = useSWR(
    `/api/saves/${post.id}/${session?.user?.id}`
  );
  const { data: myPocketData } = useSWR(
    `/api/users/${session?.user?.id}/pockets`
  );

  const [pocketsOpen, setPocketsOpen] = useState(false);
  const [saves, setSaves] = useState(0);
  const [mySave, setMySave] = useState(false);
  const [updateSave, { data: saveData, error: saveError, loading }] = useCreate(
    `/api/saves/${post?.id}`
  );
  const [
    createComment,
    {
      data: createCommentData,
      error: createCommentError,
      loading: createCommentLoading,
    },
  ] = useCreate(`/api/posts/${post?.id}/comments`);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CommentForm>();
  const [commentLength, setCommentLength] = useState(0);

  const onCommentWrite = (e: FormEvent<HTMLInputElement>): void => {
    setCommentLength(e.currentTarget.value.length);
  };

  const clickSave = () => {
    if (!session?.user) {
      signIn();
    }
    if (!mySave) {
      updateSave({ userId: session?.user?.id });
    } else {
      fetch(`/api/saves/${post.id}/${session?.user?.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            setMySave(true);
          }
        });
    }
  };

  const organizedComments = organizeComments(post.comments);

  const renderComment = (comment: CommentWithNode) => {
    return (
      <div
        className="pl-3 border-b last:border-none border-gray-200"
        key={comment.id}
      >
        <CommentItem comment={comment} postId={post.id} />
        {comment.replies && comment.replies.length > 0
          ? comment.replies.map((reply) => renderComment(reply))
          : null}
      </div>
    );
  };

  const renderOrganizedComments =
    organizedComments.length > 0 ? (
      organizedComments.map((o) => {
        return renderComment(o);
      })
    ) : (
      <p className="text-xs text-gray-600">No comment yet</p>
    );

  const addToPocketHandler = (pocketId: string) => {
    fetch(`/api/posts/${post.id}/pockets/${pocketId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPocketsOpen(false);
    router.refresh();
  };

  const renderMyPockets =
    myPocketData && myPocketData.pockets && myPocketData.pockets.length > 0 ? (
      myPocketData.pockets.map((pocket: ExtendedPocket) => {
        return (
          <div
            key={pocket.id}
            className={` p-2 border-b border-gray-400 last:border-none flex items-center gap-1 hover:bg-gray-100 min-w-[260px] group cursor-pointer ${
              post.pocketId == pocket.id && "bg-blue-100"
            }`}
            onClick={() => addToPocketHandler(pocket.id)}
          >
            {post.pocketId == pocket.id ? (
              <IconCheck width={12} color="rgb(37 99 235)" />
            ) : (
              <>
                <IconFolder width={12} className="block group-hover:hidden" />
                <IconPlus width={12} className="hidden group-hover:block" />
              </>
            )}
            <p
              className={`text-sm ${
                post.pocketId == pocket.id && "text-blue-600 font-medium"
              }`}
            >
              {pocket.name}
            </p>
          </div>
        );
      })
    ) : (
      <div>
        <NoDataMessage message="You don't have any pocket yet." />
        <Button
          size="small"
          mode="black"
          button={false}
          link="/account/mystuffs"
        >
          Go Create
        </Button>
      </div>
    );
  const onValid = (validForm: CommentForm) => {
    createComment(validForm);
    reset();
    router.push(`/posts/${post.id}`);
  };

  useEffect(() => {
    theme == "light" ? setBgColor("bg-gray-200") : setBgColor("bg-gray-800");

    if (savesData) {
      setSaves(savesData.saveCount);
    }

    if (mySaveData && mySaveData.ok) {
      setMySave(true);
    } else {
      setMySave(false);
    }
  }, [
    mySaveData,
    savesData,
    setMySave,
    reset,
    createCommentData,
    createCommentLoading,
    theme,
    setBgColor,
  ]);

  return (
    <>
      <div className="border border-slate-500 border-r-2 border-b-2 p-3 py-2 pb-1 flex flex-col gap-3 relative">
        {session?.user?.id == post.userId && (
          <>
            <Button
              size="small"
              mode="black"
              button={false}
              link={`/posts/${post.id}/edit?type=${post.type}`}
              addClass="absolute top-2 right-2 "
              data-tooltip-target="tooltip-edit"
            >
              <IconEdit width={16} />
            </Button>
            <div
              id="tooltip-edit"
              role="tooltip"
              className="absolute z-10 top-10 right-0 invisible inline-block px-3 py-2 text-xs font-medium text-white transition-opacity duration-300 bg-gray-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Edit this post
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </>
        )}
        <PostInfo post={post} />
        <h2 className="text-lg font-medium">{post.title}</h2>
        {post.content && post.content.length > 0 && (
          <div className={`text-sm p-2  ${bgColor}`}>
            <pre className=" text-wrap">{post.content}</pre>
          </div>
        )}
        {post.link && post.link.length > 0 && (
          <Link
            href={post.link || "#"}
            target="_blank"
            className="text-sm p-2 bg-blue-100 underline hover:text-blue-600"
          >
            <span className=" text-wrap">{post.link}</span>
          </Link>
        )}

        {post.link && post.linkType == "video" && (
          <Link target="_blank" href={post.link} className="aspect-video">
            <iframe
              src={getYoutubeVideo(post.link || "")}
              className="w-full h-full"
            />
          </Link>
        )}
        {post.note && post.note.length > 0 && (
          <>
            <hr className="bg-gray-700 my-2" />
            <p className="text-sm font-medium">Note</p>
            <div className={`w-full p-2 text-sm ${bgColor}`}>{post.note}</div>
          </>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center text-xs gap-1 cursor-pointer"
              onClick={clickSave}
            >
              {mySave ? (
                <IconBookmarkFilled width={16} />
              ) : (
                <IconBookmark width="16" />
              )}
              {saves}
            </div>
            <div
              className="flex items-center text-xs gap-1 cursor-pointer"
              onClick={clickSave}
            >
              <IconMessage width={16} />
              {post?.comments.length}
            </div>
          </div>
          <div className="flex items-center relative">
            <div
              className="flex items-center px-2 cursor-pointer gap-1 text-xs"
              onClick={() => setPocketsOpen((prev) => !prev)}
            >
              <IconFolder width={16} /> Add to Pocket
            </div>

            {pocketsOpen ? (
              session && session?.user ? (
                <div className="absolute top-[100%] z-50 right-0 border border-slate-400 bg-white flex flex-col">
                  {renderMyPockets}
                </div>
              ) : (
                <>
                  <NoDataMessage message={"Please login."} />
                </>
              )
            ) : null}
          </div>
        </div>
      </div>

      <div className="border border-slate-500 border-r-2 border-b-2 p-3 flex flex-col gap-3 ">
        <form onSubmit={handleSubmit(onValid)}>
          <div className="w-full flex flex-col">
            {/* <label htmlFor="name">Title</label> */}
            <div className="p-0 m-0 relative w-full">
              <input
                {...register("content", {
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Min. 3 characters",
                  },
                  maxLength: {
                    value: 500,
                    message: "Max. 500 characters",
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
          <input
            {...register("userId")}
            value={session?.user?.id}
            className="hidden"
          />
          <Button mode="success" size="small" button={true} addClass="mt-2">
            Save
          </Button>
        </form>

        <div>{renderOrganizedComments}</div>
      </div>
    </>
  );
}
