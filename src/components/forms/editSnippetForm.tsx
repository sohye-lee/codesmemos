"use client";

import { CreatePostForm, EditPostFormProps } from "@/lib/types";
import { useForm } from "react-hook-form";
import Button from "../ui/button";
import { useState, FormEvent, useEffect } from "react";
import useSWR from "swr";
import { Language } from "@prisma/client";
import { useRouter } from "next/navigation";
import useEdit from "@/lib/useEdit";
import { Editor } from "@monaco-editor/react";

type IModelContentChangedEvent = /*unresolved*/ any;

export default function EditSnippetForm({ post }: EditPostFormProps) {
  const router = useRouter();
  const [titleLength, setTitleLength] = useState(0);
  const { data, error } = useSWR("/api/languages");

  const [languages, setLanguages] = useState<Language[]>(data?.languages);
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);
  const [languageName, setLanguageName] = useState(post?.languageName);
  const [note, setNote] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostForm>({
    mode: "onBlur",
  });

  const [
    editSnippet,
    { data: editData, error: editError, loading: editLoading },
  ] = useEdit(`/api/posts/${post?.id}`);

  const onChangeTitle = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setTitleLength(e.currentTarget.value.length);
    setTitle(e.currentTarget.value);
  };

  const onChangeContent = (
    value: string,
    event: IModelContentChangedEvent
  ): void => {
    setContent(value);
  };

  const onSelectLanguage = (e: FormEvent<HTMLSelectElement>): void => {
    setLanguageName(e.currentTarget.value);
  };

  const onChangeNote = (e: FormEvent<HTMLTextAreaElement>): void => {
    setNote(e.currentTarget.value);
  };

  const onValid = () => {
    editSnippet({
      title,
      content,
      languageName,
      note,
      userId: post?.user?.id,
    });
    router.push(`/posts/${post?.id}`);
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
    setContent(post?.content);
    setLanguageName(post?.languageName);
  }, [setLanguages, setLanguageName, data, post]);

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
          className="rounded border w-full border-slate-400 py-2 px-3 pr-14"
          onChange={onSelectLanguage}
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
        <label htmlFor="name">Description</label>
        <div className="p-0 m-0 relative w-full">
          <Editor
            height="30vh"
            defaultLanguage={languageName}
            // defaultValue=""
            value={content}
            className="w-full bg-[#1e1e1e] py-3 rounded"
            theme="vs-dark"
            onChange={(value, event) => onChangeContent(value + "", event)}
          />
          {/* <textarea
            {...register("content", {
              required: "This field is required.",
            })}
            placeholder="Write a description"
            rows={12}
            className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
            value={content}
            onChange={onChangeContent}
          ></textarea> */}
        </div>
        {errors.content ? (
          <span className="text-danger-400 text-[14px]">
            {errors.content.message}
          </span>
        ) : null}
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="name">Note</label>
        <textarea
          {...register("note")}
          placeholder="(optional)"
          rows={2}
          className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
          onChange={onChangeNote}
        ></textarea>
      </div>
      {/* <input className="hidden" {...register("type")} value="question" />
      <input
        className="hidden"
        {...register("userId")}
        value={session?.user?.id || post?.userId}
      /> */}
      <div className="flex justify-end">
        <Button size="medium" button={true} mode="save">
          Update
        </Button>
      </div>
    </form>
  );
}
