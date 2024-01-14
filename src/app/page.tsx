'use client';
import Container from '@/components/ui/container';
import SidebarContainer from '@/components/ui/sidebarContainer';
import useStore from './store';
import { useEffect } from 'react';

export default function Home() {
  const { breadcrumb, setBreadcrumb } = useStore();
  useEffect(() => {
    setBreadcrumb('Home');
  }, [setBreadcrumb]);
  return (
    <Container width="wide">
      <SidebarContainer>
        <p>Hi</p>
      </SidebarContainer>
    </Container>
  );
}
