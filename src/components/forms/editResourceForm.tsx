"use client";

import { CreatePostForm, EditPostFormProps } from "@/lib/types";
import { useForm } from "react-hook-form";
import Button from "../ui/button";
import { useState, FormEvent, useEffect } from "react";
import useSWR from "swr";
import { Language } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useEdit from "@/lib/useEdit";

type IModelContentChangedEvent = /*unresolved*/ any;

export default function EditResourceForm({ post }: EditPostFormProps) {
  const router = useRouter();
  const [titleLength, setTitleLength] = useState(0);
  const { data, error } = useSWR("/api/languages");
  const [languages, setLanguages] = useState<Language[]>(data?.languages);

  const [title, setTitle] = useState(post?.title);
  const [link, setLink] = useState(post?.link);
  const [linkType, setLinkType] = useState(post?.linkType);
  const [note, setNote] = useState(post?.note);
  const [languageName, setLanguageName] = useState(post?.languageName);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostForm>({
    mode: "onBlur",
  });

  const [
    editResource,
    { data: editData, error: editError, loading: editLoading },
  ] = useEdit(`/api/posts/${post?.id}`);

  const onChangeTitle = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setTitleLength(e.currentTarget.value.length);
    setTitle(e.currentTarget.value);
  };
  const onChangeLanguage = (e: FormEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    setLanguageName(e.currentTarget.value);
  };

  const onChangeLink = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setLink(e.currentTarget.value);
  };

  const onChangeLinkType = (e: FormEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    setLinkType(e.currentTarget.value);
  };

  const onChangeNote = (e: FormEvent<HTMLTextAreaElement>): void => {
    e.preventDefault();
    setNote(e.currentTarget.value);
  };

  const onValid = () => {
    editResource({
      title,
      link,
      linkType,
      languageName,
      userId: post?.user?.id,
    });
    router.push(`/posts/${editData?.post?.id}`);
  };

  const renderLanguages =
    languages && languages.length > 0
      ? languages.map((language) => {
          return (
            <option
              key={language.id}
              value={language.name}
              selected={language.name == languageName}
            >
              {language.name}
            </option>
          );
        })
      : null;

  useEffect(() => {
    data && setLanguages(data.languages);
    setTitleLength(post?.title?.length || 0);
    setTitle(post?.title);
    setLink(post?.link);
    setLinkType(post?.linkType);
    setLanguageName(post?.languageName);
    setNote(post?.note);
  }, [
    setLanguages,
    setLanguageName,
    setTitle,
    setLink,
    setLinkType,
    setNote,
    data,
    post?.title,
    post?.link,
    post?.linkType,
    post?.languageName,
    post?.note,
  ]);

  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-3">
      <div className="w-full flex flex-col">
        <label htmlFor="name">Title</label>
        <div className="p-0 m-0 relative w-full">
          <input
            {...register("title", {
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Min. 3 characters",
              },
              maxLength: {
                value: 100,
                message: "Max. 100 characters",
              },
            })}
            type="text"
            value={title}
            placeholder="Snippet's Title"
            className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
            onChange={onChangeTitle}
          />
          <div className="absolute top-[50%] -translate-y-[50%] right-2 font-medium text-xs text-blue-600">
            {titleLength}/100
          </div>
        </div>
        {errors.title ? (
          <span className="text-danger-400 text-[14px]">
            {errors.title.message}
          </span>
        ) : null}
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="name">Language</label>
        <select
          {...register("languageName", {
            required: "This field is required",
          })}
          value={languageName}
          className="rounded border w-full border-slate-400 py-2 px-3 pr-14"
          onSelect={onChangeLanguage}
        >
          <option disabled value="default">
            Select
          </option>
          {renderLanguages}
        </select>
        {errors.languageName ? (
          <span className="text-danger-400 text-[14px]">
            {errors.languageName.message}
          </span>
        ) : null}
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="name">Link</label>
        <input
          {...register("link", { required: true })}
          value={link || ""}
          onChange={onChangeLink}
          placeholder="Link"
          className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
        />
        <p className="text-blue-400 text-xs font-medium mt-[4px]">
          *For Youtube video, copy the general share url here. Do not use url
          for embedding.
        </p>
        {errors.link ? (
          <span className="text-danger-400 text-[14px]">
            {errors.link.message}
          </span>
        ) : null}
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="name">Link Type</label>
        <select
          {...register("linkType")}
          className="rounded border w-full border-slate-400 py-2 px-3 pr-14"
          value={linkType || "url"}
          onSelect={onChangeLinkType}
        >
          <option disabled value="default">
            Select
          </option>
          <option value="url" selected={post?.linkType == "url"}>
            Url
          </option>
          <option value="video" selected={post?.linkType == "video"}>
            Youtube Video
          </option>
        </select>
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="name">Note</label>
        <textarea
          {...register("note")}
          placeholder="(optional)"
          value={note || ""}
          onChange={onChangeNote}
          rows={2}
          className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
        ></textarea>
      </div>
      {/* <input className="hidden" {...register("type")} value="resource" />
      <input className="hidden" {...register("content")} value="" />
      <input
        className="hidden"
        {...register("userId")}
        value={session?.user?.id}
      /> */}
      <div className="flex justify-end">
        <Button size="medium" button={true} mode="save">
          Update
        </Button>
      </div>
    </form>
  );
}
