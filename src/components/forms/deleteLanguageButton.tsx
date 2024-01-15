import useDelete from '@/lib/useDelete';
import { IconTrash, IconLoader } from '@tabler/icons-react';
import Button from '../ui/button';
import { Language, Topic } from '@prisma/client';
import { useEffect } from 'react';

interface DeleteButtonProps {
  language: Language;
}

export default function DeleteLanguageButton({ language }: DeleteButtonProps) {
  const [deleteLanguage, { data, error, loading }] = useDelete(
    `/api/languages/${language.name}`,
    language.name
  );
  const onClick = () => {
    deleteLanguage();
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
