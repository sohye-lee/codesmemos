import useDelete from '@/lib/useDelete';
import { IconTrash, IconLoader } from '@tabler/icons-react';
import Button from '../ui/button';
import { Topic } from '@prisma/client';
import { useEffect } from 'react';

interface DeleteButtonProps {
  topic: Topic;
}

export default function DeleteTopicButton({ topic }: DeleteButtonProps) {
  const [deleteTopic, { data, error, loading }] = useDelete(
    `/api/topics/${topic.slug}`,
    topic.slug
  );
  const onClick = () => {
    deleteTopic();
  };
  useEffect(() => {}, [data, error, loading]);
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
