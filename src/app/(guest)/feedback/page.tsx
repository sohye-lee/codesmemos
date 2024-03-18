"use client";
import ContactForm from "@/components/forms/contactForm";
import RatingForm from "@/components/forms/ratingForm";
import Container from "@/components/ui/containers/container";
import useStore from "../../store";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Feedback() {
  const { theme } = useTheme();
  const [bgColor, setBgColor] = useState<string>();
  const { setBreadcrumb } = useStore();
  useEffect(() => {
    setBreadcrumb("feedback");
    theme == "light" ? setBgColor("bg-blue-100") : setBgColor("bg-background");
  }, []);
  return (
    <Container width="small" bgColor={bgColor} addClass="gap-3">
      <RatingForm />
      <ContactForm />
    </Container>
  );
}
