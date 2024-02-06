"use client";
import { IconArrowUp } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleVisible = () => {
      window.scrollY > 300 ? setVisible(true) : setVisible(false);
    };

    window.addEventListener("scroll", handleVisible);
    return () => {
      window.removeEventListener("scroll", handleVisible);
    };
  }, []);
  return (
    <>
      {visible && (
        <div
          onClick={scrollToTop}
          className=" fixed bottom-5 right-5  w-10 h-10 flex items-center justify-center z-40 transition cursor-pointer bg-gray-700 opacity-40 p-2 hover:opacity-60"
        >
          <IconArrowUp width={16} color="#fff" />
        </div>
      )}
      <div className="w-full absolute bottom-0 left-0 px-5 py-4 flex items-center justify-between border-t border-gray-300">
        <p className="text-xs text-gray-500">
          Copyright. 2024 Sohye Kim. All Rights Reserved.
        </p>
        <Link
          href="https://sohye.dev"
          target="_blank"
          className="text-xs text-gray-700 hover:text-blue-500"
        >
          sohye.dev
        </Link>
      </div>
    </>
  );
}
