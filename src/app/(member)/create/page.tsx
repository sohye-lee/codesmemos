'use client';
import Container from '@/components/ui/containers/container';
import { postType } from '@/lib/types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CreateSnippetForm from '@/components/forms/createSnippetForm';
import { useSearchParams } from 'next/navigation';
import CreateResourceForm from '@/components/forms/createResourceForm';
import CreateQuestionForm from '@/components/forms/createQuestionForm';
import useStore from '../../store';
import { useTheme } from 'next-themes';

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
  const { theme, setTheme } = useTheme();
  const [bgColor, setBgColor] = useState<string>();
  const { breadcrumb, setBreadcrumb } = useStore();
  const searchParams = useSearchParams();
  const type = searchParams.get('type')?.toString();
  const [tab, setTab] = useState(type || 'snippet');

  const activeStyle = 'border-b-none bg-background';
  const inactiveStyle = 'border-b border-slate-400 bg-gray-200 text-gray-600';
  const inactiveDarkStyle = 'border-b border-slate-400 bg-gray-700 ';

  useEffect(() => {
    theme == 'light' ? setBgColor('bg-blue-100') : setBgColor('');
    setBreadcrumb('create');
    type && type != null && setTab(type);
  }, [setBreadcrumb, type, searchParams]);

  return (
    <Container width="small" bgColor={bgColor}>
      <div className="w-full flex flex-col gap-3 p-3">
        <h1 className="text-xl font-medium">Create a New Post</h1>
        <div className="w-full border border-slate-500 border-r-2 border-b-2">
          <div className="w-full flex items-stretch">
            <div
              className={`w-1/3 py-2 px-3 text-md  ${
                tab == 'snippet'
                  ? activeStyle
                  : theme == 'dark'
                  ? inactiveDarkStyle
                  : inactiveStyle
              }`}
              onClick={() => setTab('snippet')}
            >
              Snippet
            </div>
            <div
              className={`w-1/3 py-2 px-3  text-md border-l border-slate-400 ${
                tab == 'question'
                  ? activeStyle
                  : theme == 'dark'
                  ? inactiveDarkStyle
                  : inactiveStyle
              }`}
              onClick={() => setTab('question')}
            >
              Question
            </div>
            <div
              className={`w-1/3 py-2 px-3  text-md border-l border-slate-400 ${
                tab == 'resource'
                  ? activeStyle
                  : theme == 'dark'
                  ? inactiveDarkStyle
                  : inactiveStyle
              }`}
              onClick={() => setTab('resource')}
            >
              Resource
            </div>
          </div>
          <div className="p-4 bg-background">
            {tab == 'snippet' && <CreateSnippetForm />}
            {tab == 'question' && <CreateQuestionForm />}
            {tab == 'resource' && <CreateResourceForm />}
          </div>
        </div>
      </div>
    </Container>
  );
}
