'use client';

import Button from '@/components/ui/button';
import Container from '@/components/ui/container';
import { postType } from '@/lib/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Editor } from '@monaco-editor/react';
import CreateSnippetForm from '@/components/forms/createSnippetForm';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getStaticPaths } from 'next/dist/build/templates/pages';
import CreateResourceForm from '@/components/forms/createResourceForm';
import CreateQuestionForm from '@/components/forms/createQuestionForm';

type TabType = 'snippet' | 'question' | 'resource';

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

export default function CreatePage(props: any) {
  const type = props.searchParams.type;
  const [tab, setTab] = useState<TabType>(type || 'snippet');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostForm>();
  const activeStyle = 'border-b-none bg-white';
  const inactiveStyle = 'border-b border-slate-400 bg-gray-200 text-gray-600';
  return (
    <Container width="small" bgColor="bg-blue-100 ">
      <div className="w-full flex flex-col gap-3 p-3">
        <h1 className="text-xl font-medium">Create a New Post</h1>
        <div className="w-full border border-slate-500 border-r-2 border-b-2">
          <div className="w-full flex items-stretch">
            <div
              className={`w-1/3 py-2 px-3 text-md  ${
                tab == 'snippet' ? activeStyle : inactiveStyle
              }`}
              onClick={() => setTab('snippet')}
            >
              Snippet
            </div>
            <div
              className={`w-1/3 py-2 px-3  text-md border-l border-slate-400 ${
                tab == 'question' ? activeStyle : inactiveStyle
              }`}
              onClick={() => setTab('question')}
            >
              Question
            </div>
            <div
              className={`w-1/3 py-2 px-3  text-md border-l border-slate-400 ${
                tab == 'resource' ? activeStyle : inactiveStyle
              }`}
              onClick={() => setTab('resource')}
            >
              Resource
            </div>
          </div>
          <div className="p-4 bg-white">
            {tab == 'snippet' && <CreateSnippetForm />}
            {tab == 'question' && <CreateQuestionForm />}
            {tab == 'resource' && <CreateResourceForm />}
          </div>
        </div>
      </div>
    </Container>
  );
}
