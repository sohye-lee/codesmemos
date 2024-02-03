'use client';
import PocketItem from '@/components/ui/accountRelated/pocketItem';
import Button from '@/components/ui/button';
import Container from '@/components/ui/containers/container';
import { boxClassName } from '@/lib/constants';
import { ExtendedPocket } from '@/lib/types';
import useCreate from '@/lib/useCreate';
import {
  IconFolder,
  IconFolderCheck,
  IconPlus,
  IconChevronUp,
  IconCheck,
} from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

type MyStuffsTab = 'pockets' | 'saves';

interface CreatePocketForm {
  name: string;
  userId: string;
}

export default function MyStuffsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, error } = useSWR(`/api/users/${session?.user?.id}/pockets`);
  const [pockets, setPockets] = useState<ExtendedPocket[]>();
  const [tab, setTab] = useState<MyStuffsTab>('pockets');
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const activeStyle = 'border-b-none bg-white';
  const inactiveStyle = 'border-b border-slate-400 bg-gray-200 text-gray-600';
  const [
    createPocket,
    { data: createPocketData, error: createPocketError, loading },
  ] = useCreate('/api/pockets');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePocketForm>();

  const onValid = (validForm: CreatePocketForm) => {
    createPocket(validForm);
  };
  const renderCreatePocketForm = (
    <form className="py-4 px-5 bg-gray-200" onSubmit={handleSubmit(onValid)}>
      <div className="flex items-stretch gap-3">
        <input
          {...register('name', { required: 'Name is required.' })}
          className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
        />
        <input hidden {...register('userId')} value={session?.user?.id} />
        <Button size="small" button={true} mode="success">
          <IconCheck width={16} />
          Create
        </Button>
      </div>
    </form>
  );

  const renderPockets =
    pockets && pockets.length > 0 ? (
      pockets.map((pocket) => {
        return <PocketItem key={pocket.id} pocket={pocket} />;
      })
    ) : (
      <p className="py-4 text-center text-gray-600 text-sm">No pocket yet.</p>
    );

  useEffect(() => {
    data && data.pockets && setPockets(data.pockets);
    createPocketData && setPopupOpen(false);
    if (createPocketData && createPocketData?.ok) {
      router.refresh();
    }
  }, [data, createPocketData, router]);
  return (
    <Container width="medium" bgColor="bg-blue-50">
      <div className="w-full border border-slate-500 border-r-2 border-b-2 bg-white">
        <div className="flex items-stretch w-full p-0">
          <div
            className={`w-1/2 flex items-center justify-center font-md border-r border-gray-400 py-2 ${
              tab === 'pockets' ? activeStyle : inactiveStyle
            }`}
            onClick={() => setTab('pockets')}
          >
            Pockets
          </div>
          <div
            className={`w-1/2 flex items-center justify-center font-md py-3 ${
              tab === 'saves' ? activeStyle : inactiveStyle
            }`}
            onClick={() => setTab('saves')}
          >
            Saves
          </div>
        </div>
        <div className="p-3">
          <div className="flex justify-end py-2">
            {popupOpen ? (
              <Button
                size="small"
                mode="black"
                button={true}
                onClick={() => setPopupOpen(false)}
              >
                <IconChevronUp width={16} /> Close
              </Button>
            ) : (
              <Button
                size="small"
                mode="success"
                button={true}
                onClick={() => setPopupOpen(true)}
              >
                <IconPlus width={16} /> Add
              </Button>
            )}
          </div>
          {createPocketData && (
            <p className="text-sm text-gray-600">{createPocketData.message}</p>
          )}

          {popupOpen && renderCreatePocketForm}
          <div className="p-3 w-full flex flex-col gap-3">{renderPockets}</div>
        </div>
      </div>
    </Container>
  );
}
