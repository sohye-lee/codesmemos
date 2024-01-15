import { Topic } from '@prisma/client';
import { IconPencil, IconCheck } from '@tabler/icons-react';
import Button from '../ui/button';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DeleteTopicButton from './deleteTopicButton';

interface EditTopicInputProps {
  topic: Topic;
}

interface EditTopicForm {
  slug: string;
}
export default function EditTopicInput({ topic }: EditTopicInputProps) {
  const [openEdit, setOpenEdit] = useState(false);
  console.log(openEdit);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditTopicForm>();
  const [slug, setSlug] = useState(topic.slug);
  const onValid = () => {
    fetch(`/api/topics/${topic.slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then((data) => setOpenEdit(false))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setSlug(topic.slug);
  }, [topic.slug, setOpenEdit]);

  return (
    <>
      {openEdit ? (
        <>
          <form
            onSubmit={handleSubmit(onValid)}
            className="py-2 px-3 border border-gray-300 bg-white w-full rounded flex justify-between items-center"
          >
            <input
              className="border-none p-0 outline-none"
              {...register('slug', {
                required: 'Slug cannot be empty.',
                minLength: {
                  value: 3,
                  message: 'Min. 3 characters',
                },
              })}
              onChange={(e) => setSlug(e.currentTarget.value)}
              defaultValue={topic.slug}
            />
            <Button size="small" mode="save" button={true}>
              <IconCheck width="20" color="white" />
            </Button>
          </form>
          {errors.slug ? (
            <p className="text-[13px] text-red-500 ">{errors.slug.message}</p>
          ) : null}
        </>
      ) : (
        <div className="py-2 px-3 border border-gray-300 w-full rounded flex justify-between items-center">
          <p className="text-sm">{topic?.slug}</p>
          <div className="flex items-end gap-3">
            <Button
              size="small"
              mode="neutral"
              button={true}
              onClick={() => setOpenEdit(true)}
            >
              <IconPencil width="20" />
            </Button>
            <DeleteTopicButton topic={topic} />
          </div>
        </div>
      )}
    </>
  );
}
