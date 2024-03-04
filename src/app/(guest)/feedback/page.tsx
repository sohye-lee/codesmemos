"use client";
import ContactForm from "@/components/forms/contactForm";
import RatingForm from "@/components/forms/ratingForm";
import Container from "@/components/ui/containers/container";
import useStore from "../../store";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Feedback() {
  const { theme } = useTheme();
  const [bgColor, setBgColor] = useState();
  const { setBreadcrumb } = useStore();
  useEffect(() => {
    setBreadcrumb("feedback");
  }, []);
  return (
    <Container width="small" bgColor="bg-blue-50 " addClass="gap-3">
      <RatingForm />
      <ContactForm />
    </Container>
  );
}
