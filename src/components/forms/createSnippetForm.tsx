'use client';

import { CreatePostForm, postType } from '@/lib/types';
import { Editor, EditorProps } from '@monaco-editor/react';
import { useForm } from 'react-hook-form';
import Button from '../ui/button';
import { useState, FormEvent, useEffect } from 'react';
import useSWR from 'swr';
import { Language } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from '@/app/actions';
import { useRouter } from 'next/navigation';
type IModelContentChangedEvent = /*unresolved*/ any;

export default function CreateSnippetForm() {
  const { data: session } = useSession();
  if (!session) {
    signIn();
  }
  const router = useRouter();
  const [titleLength, setTitleLength] = useState(0);
  const { data, error } = useSWR('/api/languages');
  const [languages, setLanguages] = useState<Language[]>();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [languageName, setLanguageName] = useState('javascript');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostForm>({
    mode: 'onBlur',
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

  const onSubmit = () => {
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: session?.user?.id!,
        title,
        content,
        note,
        languageName,
        type: 'snippet',
      }),
    })
      .then((res) => res.json())
      .then((data) => router.push(`/posts/${data.post.id}`));
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
    // if (!session) {
    //   signIn();
    // }
  }, [setLanguages, setLanguageName]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="w-full flex flex-col">
        <label htmlFor="name">Title</label>
        <div className="p-0 m-0 relative w-full">
          <input
            {...register('title', {
              required: 'This field is required',
              minLength: {
                value: 3,
                message: 'Min. 3 characters',
              },
              maxLength: {
                value: 100,
                message: 'Max. 100 characters',
              },
            })}
            type="text"
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
          {...register('languageName', {
            required: 'This field is required',
          })}
          className="rounded border w-full border-slate-400 py-2 px-3 pr-14"
          onSelect={onSelectLanguage}
        >
          <option disabled selected value="">
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
        <label htmlFor="name">Code</label>
        <div className="p-0 m-0 relative w-full">
          <Editor
            height="30vh"
            defaultLanguage={languageName}
            // defaultValue=""
            value={content}
            className="w-full bg-[#1e1e1e] py-3 rounded"
            theme="vs-dark"
            onChange={(value, event) => onChangeContent(value + '', event)}
          />
        </div>
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="name">Note</label>
        <textarea
          {...register('note')}
          placeholder="(optional)"
          rows={2}
          className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
          onChange={onChangeNote}
        ></textarea>
      </div>
      <input className="hidden" name="type" value="snippet" />
      <input className="hidden" name="userId" value={session?.user?.id} />
      <div className="flex justify-end">
        <Button size="medium" button={true} mode="success">
          Create
        </Button>
      </div>
    </form>
  );
}
