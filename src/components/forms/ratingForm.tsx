'use client';
import { boxClassName } from '@/lib/constants';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import Button from '../ui/button';
import useCreate from '@/lib/useCreate';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';

const Star = ({ filled }: { filled: boolean }) => {
  return filled ? (
    <IconStarFilled width={32} className="text-blue-600 " />
  ) : (
    <IconStar width={32} className="text-blue-600" />
  );
};

interface RatingForm {
  stars: number;
}

export default function RatingForm() {
  const router = useRouter();
  const [stars, setStars] = useState<number>(0);
  const [rate, { data, error, loading }] = useCreate('/api/ratings');
  const { data: ratingsData } = useSWR('/api/ratings');
  const [average, setAverage] = useState(0);
  const { handleSubmit } = useForm<RatingForm>();
  const onClick = (number: number) => {
    if (stars < number || stars > number) {
      setStars(number);
    } else if (stars == number) {
      setStars(number - 1);
    }
  };
  const onSubmit = () => {
    rate({ stars });
    setStars(0);
    router.refresh();
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
      className={`${boxClassName} bg-white px-4 py-5 w-full flex flex-col gap-3`}
    >
      <div className="flex justify-between">
        <h1 className="text-xl font-medium">Rate Us!</h1>
        <p className="text-sm text-slate-500">
          <span className="text-blue-600 font-medium">
            {Math.round(average * 100) / 100}/5
          </span>{' '}
          on {ratingsData?.ratings?.length} ratings
        </p>
      </div>
      <div className="flex justify-between">
        {renderStars}

        <form onSubmit={handleSubmit(onSubmit)}>
          <input hidden value={stars} name="rating" readOnly />
          <Button mode="success" size="medium" button={true}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
