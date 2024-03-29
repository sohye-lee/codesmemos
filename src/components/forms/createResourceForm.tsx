"use client";

import { CreatePostForm } from "@/lib/types";
import { useForm } from "react-hook-form";
import Button from "../ui/button";
import { useState, FormEvent, useEffect } from "react";
import useSWR from "swr";
import { Language } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useCreate from "@/lib/useCreate";
type IModelContentChangedEvent = /*unresolved*/ any;

export default function CreateResourceForm() {
  const { data: session } = useSession();

  const router = useRouter();
  const [titleLength, setTitleLength] = useState(0);
  const { data, error } = useSWR("/api/languages");
  const [
    createResource,
    { data: createData, error: createError, loading: createLoading },
  ] = useCreate("/api/posts");
  const [languages, setLanguages] = useState<Language[]>(data?.languages);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [languageName, setLanguageName] = useState("javascript");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostForm>({
    mode: "onBlur",
  });

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

  const onValid = (validForm: CreatePostForm) => {
    createResource(validForm);
    createData?.ok && router.push(`/posts/${createData?.post.id}`);
  };

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

    createData?.ok && router.push(`/posts/${createData?.post.id}`);
  }, [setLanguages, setLanguageName]);

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
            placeholder="Snippet's Title"
            className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
            // onChange={onChangeTitle}
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
          defaultValue={"default"}
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
        <label htmlFor="name">Useful Resource</label>
        <input
          {...register("link", { required: true })}
          placeholder="Link"
          className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
          // onChange={onChangeNote}
        />
        <p className="text-blue-400 text-xs font-medium mt-[4px]">
          *Copy a general video url here. Do not use url for embedding.
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
          // onSelect={onSelectLanguage}
          defaultValue={"default"}
        >
          <option disabled value="default">
            Select
          </option>
          <option value="url">Url</option>
          <option value="video">Youtube Video</option>
        </select>
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="name">Note</label>
        <textarea
          {...register("note")}
          placeholder="(optional)"
          rows={2}
          className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
          // onChange={onChangeNote}
        ></textarea>
      </div>
      <input className="hidden" {...register("type")} value="resource" />
      <input className="hidden" {...register("content")} value="" />
      <input
        className="hidden"
        {...register("userId")}
        value={session?.user?.id}
      />
      <div className="flex justify-end">
        <Button size="medium" button={true} mode="success">
          Create
        </Button>
      </div>
    </form>
  );
}
