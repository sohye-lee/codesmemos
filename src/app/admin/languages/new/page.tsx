'use client';
import Loading from '@/app/loading';
import Button from '@/components/ui/button';
import Container from '@/components/ui/container';
import useCreate from '@/lib/useCreate';
import { Language, Topic } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import useDelete from '@/lib/useDelete';
import DeleteButton from '@/components/forms/deleteTopicButton';
import EditTopicInput from '@/components/forms/editTopicInput';
import EditLanguageInput from '@/components/forms/editLanugageInput';

interface LanguageCreateForm {
  name: string;
}
export default function LanguageCreatePage() {
  const router = useRouter();
  const { data: languagesData, error: languagesError } =
    useSWR('/api/languages');
  const [languages, setLanguages] = useState<Language[]>([]);
  const [createLanguage, { data, error, loading }] =
    useCreate('/api/languages');

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LanguageCreateForm>();

  const onValid = (validForm: LanguageCreateForm) => {
    createLanguage(validForm);
    router.refresh();
    reset();
  };

  const renderLanguages =
    languages && languages.length > 0
      ? languages.map((language) => {
          return <EditLanguageInput language={language} key={language.id} />;
        })
      : null;

  useEffect(() => {
    languagesData && setLanguages(languagesData.languages);
  }, [languagesData, errors, data, router, reset]);

  return (
    <>
      {!languagesData && !languagesError ? (
        <Loading />
      ) : (
        <Container width="small">
          <div className="w-full">
            <form
              onSubmit={handleSubmit(onValid)}
              className="w-full flex flex-col gap-3"
            >
              <h1 className="text-xl font-medium">
                Add A Programming Language
              </h1>
              {data && !data.ok ? (
                <p className="text-danger-400 font-normal text-sm">
                  {data.message}
                </p>
              ) : null}
              {error ? (
                <p className="text-danger-400 font-normal text-sm">
                  Something went wrong.
                </p>
              ) : null}
              <div className="w-full flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                  {...register('name', {
                    required: 'This field is required',
                  })}
                  type="text"
                  placeholder="*Type here"
                  className="rounded border border-slate-400 py-2 px-3"
                />
                {errors.name ? (
                  <span className="text-danger-400 text-[14px]">
                    {errors.name.message}
                  </span>
                ) : null}
              </div>

              <div className="flex justify-end pt-2">
                <Button size="medium" mode="success" button={true}>
                  Create
                </Button>
              </div>
            </form>
          </div>
          <div className="py-3 px-4 bg-gray-100 border border-gray-200 mt-8 rounded w-full">
            <h3 className="text-md font-medium">
              Current Programming Languages
            </h3>
            <div className="flex flex-col mt-3 gap-3">
              {languages && languages.length > 0 ? (
                renderLanguages
              ) : (
                <p className="text-sm font-light text-gray-600">
                  No topic yet.
                </p>
              )}
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
