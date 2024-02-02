"use client";
import { useEffect, useState } from "react";
import Button from "../button";
import { IconPencilCode, IconArrowRight } from "@tabler/icons-react";
import useSWR from "swr";
import { Language, Topic } from "@prisma/client";
import Link from "next/link";

export default function Sidebar() {
  const [languages, setLanguages] = useState<Language[]>();
  const [topics, setTopics] = useState<Topic[]>();

  const { data: topicsData, error: topicsError } = useSWR("/api/topics");
  const { data: languagesData, error: languagesError } =
    useSWR("/api/languages");

  const renderLanguages =
    languages && languages.length > 0 ? (
      languages.map((language) => {
        return (
          <Link
            key={language.id}
            href={`/languages/${language.name}`}
            className="text-sm group  hover:text-blue-600  py-1 flex items-center gap-2"
          >
            {language.name}
            <IconArrowRight
              width={14}
              className="opacity-0 group-hover:opacity-100 p-0 y-0"
            />
          </Link>
        );
      })
    ) : (
      <p>No language yet</p>
    );

  const renderTopics =
    topics && topics.length > 0
      ? topics.map((topic) => {
          return (
            <Link
              key={topic.id}
              href={`/languages/${topic.slug}`}
              className="text-sm group  hover:text-blue-600   py-1 flex items-center gap-2"
            >
              {topic.slug}
              <IconArrowRight
                width={14}
                className="opacity-0 group-hover:opacity-100 p-0 y-0"
              />
            </Link>
          );
        })
      : null;

  useEffect(() => {
    topicsData && setTopics(topicsData.topics);
    languagesData && setLanguages(languagesData.languages);
  }, [setTopics, setLanguages, topicsData, languagesData]);

  return (
    <div className="border border-slate-500 border-r-2 border-b-2 p-3 flex flex-col gap-3">
      <Button
        size="medium"
        mode="success"
        button={false}
        addClass="border border-gray-200 bg-gray-100 flex items-center gap-2"
        link="/create"
      >
        <IconPencilCode width={16} />
        Write
      </Button>
      <hr className="mt-3 border-gray-400" />
      <div className="flex flex-col ">
        <h3 className="text-md font-medium py-1">Languages</h3>
        {renderLanguages}
      </div>
      {/* <hr className="mt-3 border-gray-400" />
      <div className="flex flex-col ">
        <h3 className="text-md font-medium py-1">Topics</h3>
        {renderTopics}
      </div> */}
    </div>
  );
}
