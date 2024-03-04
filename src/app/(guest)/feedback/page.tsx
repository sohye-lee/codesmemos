'use client';
import ContactForm from '@/components/forms/contactForm';
import RatingForm from '@/components/forms/ratingForm';
import Container from '@/components/ui/containers/container';
import useStore from '../../store';
import { useEffect } from 'react';

export default function Feedback() {
  const { setBreadcrumb } = useStore();
  useEffect(() => {
    setBreadcrumb('feedback');
  }, []);
  return (
    <Container width="small" bgColor="bg-blue-50 " addClass="gap-3">
      <RatingForm />
      <ContactForm />
    </Container>
  );
}
