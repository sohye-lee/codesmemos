"use client";

import Container from "@/components/ui/containers/container";
import { postType } from "@/lib/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CreateSnippetForm from "@/components/forms/createSnippetForm";
import { usePathname, useSearchParams } from "next/navigation";
import CreateResourceForm from "@/components/forms/createResourceForm";
import CreateQuestionForm from "@/components/forms/createQuestionForm";
import useStore from "@/app/store";
import useSWR from "swr";
import EditQuestionForm from "@/components/forms/editQuestionForm";

type TabType = "snippet" | "question" | "resource";

interface CreatePostForm {
  title: string;
  content: string;
  type: postType;
  note?: string;
  link?: string;
  linkType?: string;
  topicSlug?: string;
  languageName?: string;
}

export default function EditPage() {
  const { breadcrumb, setBreadcrumb } = useStore();
  const searchParams = useSearchParams();
  const type = searchParams.get("type")?.toString();

  const [tab, setTab] = useState(type || "snippet");

  const path = usePathname();
  const [post, setPost] = useState();
  const { data } = useSWR(`/api/posts/${path.split("/")[2]}`);

  const activeStyle = "border-b-none bg-white";
  const inactiveStyle = "border-b border-slate-400 bg-gray-200 text-gray-600";

  useEffect(() => {
    setBreadcrumb(type + "");
    data && data?.post && setPost(data?.post);

    type && type != null && setTab(type);
  }, [setBreadcrumb, type, searchParams, data?.post]);

  return (
    <Container width="small" bgColor="bg-blue-100 ">
      <div className="w-full flex flex-col gap-3 p-3">
        <h1 className="text-xl font-medium">Create a New Post</h1>
        <div className="w-full border border-slate-500 border-r-2 border-b-2">
          <div className="w-full flex items-stretch">
            <div
              className={`w-1/3 py-2 px-3 text-md  ${
                tab == "snippet" ? activeStyle : inactiveStyle
              }`}
              onClick={() => setTab("snippet")}
            >
              Snippet
            </div>
            <div
              className={`w-1/3 py-2 px-3  text-md border-l border-slate-400 ${
                tab == "question" ? activeStyle : inactiveStyle
              }`}
              onClick={() => setTab("question")}
            >
              Question
            </div>
            <div
              className={`w-1/3 py-2 px-3  text-md border-l border-slate-400 ${
                tab == "resource" ? activeStyle : inactiveStyle
              }`}
              onClick={() => setTab("resource")}
            >
              Resource
            </div>
          </div>
          <div className="p-4 bg-white">
            {tab == "snippet" && <CreateSnippetForm />}
            {tab == "question" && (
              <EditQuestionForm method="edit" post={post} />
            )}
            {tab == "resource" && <CreateResourceForm />}
          </div>
        </div>
      </div>
    </Container>
  );
}
