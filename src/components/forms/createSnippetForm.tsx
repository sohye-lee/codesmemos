'use client';

import { postType } from '@/lib/types';
import { Editor, EditorProps } from '@monaco-editor/react';
import { useForm } from 'react-hook-form';
import Button from '../ui/button';
import { useState, FormEvent, useEffect } from 'react';
import useSWR from 'swr';
import { Language } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from '@/app/actions';
type IModelContentChangedEvent = /*unresolved*/ any;
interface CreatePostForm {
  title: string;
  content: string;
  type: postType;
  note?: string;
  link?: string;
  linkType?: string;
  topicSlug?: string;
  languageName?: string;
}
export default function CreateSnippetForm() {
  const session = useSession();
  const { data: userData } = session;
  const [titleLength, setTitleLength] = useState(0);
  const { data, error } = useSWR('/api/languages');
  const [languages, setLanguages] = useState<Language[]>();
  const [code, setCode] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostForm>({
    mode: 'onBlur',
  });

  const onChangeTitle = (e: FormEvent<HTMLInputElement>) => {
    setTitleLength(e.currentTarget.value.length);
  };

  const onChangeCode = (value: string, event: IModelContentChangedEvent) => {
    setCode(value || '');
  };

  const renderLanguages =
    languages && languages.length > 0
      ? languages.map((language) => {
          return <option value={language.name}>{language.name}</option>;
        })
      : null;

  useEffect(() => {
    data && setLanguages(data.languages);
    if (!session) {
      signIn();
    }
  }, [data]);

  return (
    <form action="" className="flex flex-col gap-3">
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
          {/* <input
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
            placeholder="*Type here"
            className="rounded border w-full border-slate-400 py-2 px-3 pr-14"
            onChange={onChangeTitle}
          /> */}
          <Editor
            height="30vh"
            defaultLanguage="javascript"
            defaultValue=""
            className="w-full bg-[#1e1e1e] py-3 rounded"
            theme="vs-dark"
            onChange={(value, event) => onChangeCode(value + '', event)}
          />
        </div>
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="name">Note</label>
        <input
          {...register('note')}
          type="text"
          placeholder="(optional)"
          className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
        />
      </div>
      <input className="hidden" name="type" value="snippet" />
      <input className="hidden" name="userId" value={userData?.user?.id} />
      <div className="flex justify-end">
        <Button size="medium" button={true} mode="success">
          Create
        </Button>
      </div>
    </form>
  );
}
