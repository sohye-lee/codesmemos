"use client";
import { boxClassName } from "@/lib/constants";
import { IconSend, IconStar, IconStarFilled } from "@tabler/icons-react";
import React, { FormEvent, useEffect, useState } from "react";
import Button from "../ui/button";
import useCreate from "@/lib/useCreate";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const Star = ({ filled }: { filled: boolean }) => {
  return filled ? (
    <IconStarFilled width={32} className="text-blue-600 " />
  ) : (
    <IconStar width={32} className="text-blue-600" />
  );
};

interface RatingForm {
  stars: number;
  note?: string;
}

export default function RatingForm() {
  const router = useRouter();
  const [stars, setStars] = useState<number>(0);
  const [note, setNote] = useState<string>();
  const [rate, { data, error, loading }] = useCreate("/api/ratings");
  const { data: ratingsData } = useSWR("/api/ratings");
  const [average, setAverage] = useState(0);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<RatingForm>();
  const onClick = (number: number) => {
    if (stars < number || stars > number) {
      setStars(number);
    } else if (stars == number) {
      setStars(number - 1);
    }
  };
  const onSubmit = () => {
    rate({ stars, note });
    setStars(0);
    router.refresh();
    reset();
  };
  const renderStars = (
    <div className="flex gap-1 justify-center cursor-pointer">
      <div onClick={() => onClick(1)}>
        <Star filled={stars >= 1} />
      </div>
      <div onClick={() => onClick(2)}>
        <Star filled={stars >= 2} />
      </div>
      <div onClick={() => onClick(3)}>
        <Star filled={stars >= 3} />
      </div>
      <div onClick={() => onClick(4)}>
        <Star filled={stars >= 4} />
      </div>
      <div onClick={() => onClick(5)}>
        <Star filled={stars >= 5} />
      </div>
    </div>
  );
  useEffect(() => {
    ratingsData?.ok && setAverage(ratingsData?.average);
    data?.ok && router.refresh();
    // data?.ok &&
  }, [ratingsData?.ok, data?.ok, router, ratingsData?.average]);

  return (
    <div
      className={`${boxClassName} bg-background px-4 py-5 w-full flex flex-col gap-3`}
    >
      <div className="flex justify-between">
        <h1 className="text-xl font-medium">Rate Us!</h1>
        <p className="text-sm text-slate-500">
          <span className="text-blue-600 font-medium">
            {Math.round(average * 100) / 100}/5
          </span>{" "}
          on {ratingsData?.ratings?.length} ratings
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {renderStars}

        <form onSubmit={handleSubmit(onSubmit)} className="">
          <input hidden value={stars} name="rating" readOnly />{" "}
          <div className="w-full flex flex-col mb-3 items-end">
            <div className="p-0 m-0 relative w-full">
              <input
                {...register("note")}
                type="text"
                placeholder="Please share any feedback with us!"
                className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setNote(e.currentTarget.value)
                }
              />
            </div>
            {errors.note ? (
              <span className="text-danger-400 text-[14px]">
                {errors.note.message}
              </span>
            ) : null}
          </div>
          <div className="flex justify-end">
            <Button
              size="medium"
              mode="success"
              button={true}
              addClass="gap-2 flex items-center"
            >
              <IconSend width="16" /> Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
