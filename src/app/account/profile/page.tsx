"use client";

import Container from "@/components/ui/containers/container";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { data, error } = useSWR(`/api/users/${session?.user?.id}`);
  const uniqueName: string = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    length: 2,
    separator: "_",
  });
  const [popupOpen, setPopupOpen] = useState(false);
  const [username, setUsername] = useState(uniqueName);

  const onValid = () => {
    fetch(`/api/users/${session?.user?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
  };

  useEffect(() => {
    data ? console.log(data) : console.log("no data");
  }, [data]);
  return (
    <Container width="small">
      <div className="fixed z-100 top-0 left-0 w-screen h-screen bg-slate-600 opacity-20 flex items-center justify-center">
        <form action="" className="bg-white"></form>
      </div>
      <div>{}</div>
    </Container>
  );
}
