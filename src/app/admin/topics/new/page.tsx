"use client";
import Loading from "@/app/loading";
import Button from "@/components/ui/button";
import Container from "@/components/ui/containers/container";
import useCreate from "@/lib/useCreate";
import { Topic } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import useDelete from "@/lib/useDelete";
import DeleteButton from "@/components/forms/deleteTopicButton";
import EditTopicInput from "@/components/forms/editTopicInput";

interface TopicCreateForm {
  slug: string;
  description?: string;
}
export default function TopicCreatePage() {
  const router = useRouter();
  const { data: topicsData, error: topicsError } = useSWR("/api/topics");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [createTopic, { data, error, loading }] = useCreate("/api/topics");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TopicCreateForm>();

  const onValid = (validForm: TopicCreateForm) => {
    createTopic(validForm);
    router.refresh();
    reset();
  };

  const renderTopics =
    topics && topics.length > 0
      ? topics.map((topic) => {
          return (
            // <div
            //   key={topic?.slug}
            //   className="py-2 px-3 border border-gray-300 w-full rounded flex justify-between items-center"
            // >
            //   <p className="text-sm">{topic?.slug}</p>
            //   <div className="flex items-end gap-3">
            //     <Button
            //       size="small"
            //       mode="neutral"
            //       button={false}
            //       link={`/topics/${topic.slug}/edit`}
            //     >
            //       <IconPencil width="20" />
            //     </Button>
            //     <DeleteButton topic={topic} />
            //   </div>
            // </div>
            <EditTopicInput topic={topic} key={topic.id} />
          );
        })
      : null;

  useEffect(() => {
    topicsData && setTopics(topicsData.topics);
  }, [topicsData, errors, data, router, reset]);

  return (
    <>
      {!topicsData && !topicsError ? (
        <Loading />
      ) : (
        <Container width="small">
          <div className="w-full">
            <form
              onSubmit={handleSubmit(onValid)}
              className="w-full flex flex-col gap-3"
            >
              <h1 className="text-xl font-medium">Create A New Topic</h1>
              {data && !data.ok ? (
                <p className="text-danger-400 font-normal text-sm">
                  {data.message}
                </p>
              ) : null}
              <div className="w-full flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                  {...register("slug", {
                    required: "This field is required",
                    maxLength: {
                      value: 30,
                      message: "No more than 30 characters",
                    },
                    minLength: {
                      value: 3,
                      message: "At least 3 characters required",
                    },
                  })}
                  type="text"
                  placeholder="*Min. 3 characters"
                  className="rounded border border-slate-400 py-2 px-3"
                />
                {errors.slug ? (
                  <span className="text-danger-400 text-[14px]">
                    {errors.slug.message}
                  </span>
                ) : null}
              </div>
              {/* <div className="w-full flex flex-col">
                <label htmlFor="name">Short Description or Note</label>
                <input
                  {...register('description')}
                  type="text"
                  placeholder="(optional)"
                  className="rounded border border-slate-400 py-2 px-3 placeholder:text-[14px]"
                />
              </div> */}
              <div className="flex justify-end pt-2">
                <Button size="medium" mode="success" button={true}>
                  Create
                </Button>
              </div>
            </form>
          </div>
          <div className="py-3 px-4 bg-gray-100 border border-gray-200 mt-8 rounded w-full">
            <h3 className="text-md font-medium">Current Topics</h3>
            <div className="flex w-full flex-col mt-3 gap-3">
              {topics && topics.length > 0 ? (
                renderTopics
              ) : (
                <p>No topic yet.</p>
              )}
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
