import useDelete from '@/lib/useDelete';
import { IconTrash, IconLoader } from '@tabler/icons-react';
import Button from './button';
import { Topic } from '@prisma/client';
import { useEffect } from 'react';

interface DeleteButtonProps {
  topic: Topic;
}

export default function DeleteButton({ topic }: DeleteButtonProps) {
  const [deleteTopic, { data, error, loading }] = useDelete(
    `/api/topics/${topic.slug}`, topic.slug
  );
  const onClick = () => {
    // console.log('clicked delete');
    // fetch(`/api/topics/${topic.slug}`, {
    //   method: 'DELETE',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ slug: topic.slug }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
    deleteTopic();
  };
  //   useEffect(() => {}, [data, error, loading]);
  return (
    <form onSubmit={onClick}>
      {data && <p>{data.message}</p>}
      <Button size="small" mode="danger" button={true}>
        {loading ? (
          <IconLoader width="20" className="animate-spin" />
        ) : (
          <IconTrash width="20" />
        )}
      </Button>
    </form>
  );
}
