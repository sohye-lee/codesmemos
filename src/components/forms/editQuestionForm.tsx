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

export default function EditQuestionForm({ method, post }: EditPostFormProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [titleLength, setTitleLength] = useState(0);
  const { data, error } = useSWR("/api/languages");
  const [languages, setLanguages] = useState<Language[]>(data?.languages);
  const [defaultValues, setDefaultValues] = useState({
    // title: post?.po
  });
  // const [content, setContent] = useState("");
  // const [title, setTitle] = useState("");
  // const [note, setNote] = useState("");
  const [languageName, setLanguageName] = useState("javascript");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostForm>({
    mode: "onBlur",
  });

  const [
    editQustion,
    { data: editData, error: editError, loading: editLoading },
  ] = useEdit(`/api/posts/${post?.id}`);

  const onChangeTitle = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setTitleLength(e.currentTarget.value.length);
    // setTitle(e.currentTarget.value);
  };

  // const onChangeContent = (
  //   value: string,
  //   event: IModelContentChangedEvent
  // ): void => {
  //   setContent(value);
  // };

  // const onSelectLanguage = (e: FormEvent<HTMLSelectElement>): void => {
  //   setLanguageName(e.currentTarget.value);
  // };

  // const onChangeNote = (e: FormEvent<HTMLTextAreaElement>): void => {
  //   setNote(e.currentTarget.value);
  // };

  const onValid = (validForm: CreatePostForm) => {
    editQustion(validForm);
    router.push(`/posts/${editData?.post?.id}`);
  };

  // const onSubmit = () => {
  //   fetch("/api/posts", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userId: session?.user?.id!,
  //       title,
  //       content,
  //       note,
  //       languageName,
  //       type: "snippet",
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => router.push(`/posts/${data?.post?.id}`));
  // };

  const renderLanguages =
    languages && languages.length > 0
      ? languages.map((language) => {
          return (
            <option key={language.id} value={language.name}>
              {language.name}
            </option>
          );
        })
      : null;

  useEffect(() => {
    data && setLanguages(data.languages);
  }, [setLanguages, setLanguageName, data]);

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
            defaultValue={post?.title || ""}
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
          // onSelect={onSelectLanguage}
          defaultValue={post?.languageName || "default"}
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
          <textarea
            {...register("content", {
              required: "This field is required.",
            })}
            placeholder="Write a description"
            rows={12}
            className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
            // onChange={onChangeNote}
            defaultValue={post?.content || ""}
          ></textarea>
        </div>
        {errors.content ? (
          <span className="text-danger-400 text-[14px]">
            {errors.content.message}
          </span>
        ) : null}
      </div>
      {/* <div className="w-full flex flex-col">
        <label htmlFor="name">Note</label>
        <textarea
          {...register('note')}
          placeholder="(optional)"
          rows={2}
          className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
          onChange={onChangeNote}
        ></textarea>
      </div> */}
      <input className="hidden" {...register("type")} value="question" />
      <input
        className="hidden"
        {...register("userId")}
        value={session?.user?.id || post?.userId}
      />
      <div className="flex justify-end">
        <Button size="medium" button={true} mode="save">
          Save
        </Button>
      </div>
    </form>
  );
}
