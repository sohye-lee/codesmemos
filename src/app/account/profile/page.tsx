'use client';

import Container from '@/components/ui/container';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function ProfilePage() {
  const { data: session } = useSession();
  const { data, error } = useSWR(`/api/users/${session?.user?.id}`);

  useEffect(() => {
    data ? console.log(data) : console.log('no data');
  }, [data]);
  return (
    <Container width="small">
      <div>{}</div>
    </Container>
  );
}
