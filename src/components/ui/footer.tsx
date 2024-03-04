"use client";
import useCreate from "@/lib/useCreate";
import {
  IconArrowUp,
  IconSend,
  IconHeart,
  IconHeartFilled,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const [like, { data, error, loading }] = useCreate("/api/likes");
  const { data: likesData } = useSWR("/api/likes");
  const [likesCount, setLikesCount] = useState(likesData?.count);

  const [heartShow, setHeartShow] = useState(false);
  const onClick = () => {
    like({});
    setHeartShow(true);
    setTimeout(() => {
      setHeartShow(false);
    }, 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    likesData?.ok && setLikesCount(likesData?.count);
    // theme == 'light' ? setBgColor('bg-')

    const handleVisible = () => {
      window.scrollY > 300 ? setVisible(true) : setVisible(false);
    };

    window.addEventListener("scroll", handleVisible);
    return () => {
      window.removeEventListener("scroll", handleVisible);
    };
  }, [like, likesData?.ok, data?.ok]);
  return (
    <>
      <div className="fixed bottom-16 right-4 flex flex-col gap-3 z-50">
        <div className="relative group">
          <div
            className=" cursor-pointer w-10 h-10 flex items-center pr-1 justify-center bg-blue-600 text-white text-xs relative "
            onClick={onClick}
          >
            <IconHeart width={14} color="#fff" />
            {heartShow && (
              <IconHeartFilled
                width={14}
                className="text-pink-500 absolute top-[50%] left-[50%] -translate-x-[60%] -translate-y-[50%] mr-1   animate-pulse "
              />
            )}
            <span className="text-[10px] absolute top-2 right-[6px]">
              {likesCount}
            </span>
          </div>
          <div className="absolute z-50 top-[50%] right-[110%] -translate-y-[50%]  px-3 py-2 text-xs  text-gray-900 bg-blue-200 hidden group-hover:block text-nowrap overflow-visible">
            Click if you like this website!
            <div className="w-0 h-0 border-l-blue-200 border-l-[5px] border-t-[5px] border-b-[5px] border-t-transparent border-b-transparent absolute left-[100%] top-[50%] -translate-y-[50%] shadow-sm overflow-visible z-50"></div>
          </div>
        </div>
        <div className="relative group">
          <Link
            href="/feedback"
            className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white text-xs"
          >
            <IconSend width={16} color="#fff" />
          </Link>
          <div className="absolute z-50 top-[50%] right-[110%] -translate-y-[50%]  px-3 py-2 text-xs  text-gray-900 bg-blue-200 hidden group-hover:block text-nowrap overflow-visible">
            Share your feedback!
            <div className="w-0 h-0 border-l-blue-200 border-l-[5px] border-t-[5px] border-b-[5px] border-t-transparent border-b-transparent absolute left-[100%] top-[50%] -translate-y-[50%] shadow-sm overflow-visible z-50"></div>
          </div>
        </div>
        {visible && (
          <div
            onClick={scrollToTop}
            className="  w-10 h-10 flex items-center justify-center z-40 transition cursor-pointer bg-gray-700 opacity-60 p-2 hover:opacity-80"
          >
            <IconArrowUp width={16} color="#fff" />
          </div>
        )}
      </div>
      <div
        className={`w-full absolute bottom-0 left-0 px-5 py-4 flex items-center justify-between border-t border-gray-500 `}
      >
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
