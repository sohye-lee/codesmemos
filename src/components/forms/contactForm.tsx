"use client";
import { useForm } from "react-hook-form";
import Button from "../ui/button";
import { IconSend } from "@tabler/icons-react";
import { boxClassName } from "@/lib/constants";
import { useRouter } from "next/navigation";
import useCreate from "@/lib/useCreate";
import { useEffect } from "react";

export interface SendContactForm {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const router = useRouter();

  const [sendEmail, { data, error, loading }] = useCreate("/api/email");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendContactForm>({
    mode: "onBlur",
  });
  const onValid = (validForm: SendContactForm) => {
    sendEmail(validForm);
  };

  useEffect(() => {
    data?.ok && alert(data?.message);
    data?.ok && router.push("/feedback/thankyou");
  }, [data?.ok]);

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className={`${boxClassName} bg-background  px-4 py-5 w-full flex flex-col gap-3`}
    >
      <h1 className="text-xl font-medium mb-4">Your Feedback Matters</h1>
      <div className="w-full flex flex-col">
        <label htmlFor="name">Full Name</label>
        <div className="p-0 m-0 relative w-full">
          <input
            {...register("name", {
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Min. 3 characters",
              },
              maxLength: {
                value: 100,
                message: "Max. 100 characters",
              },
            })}
            type="text"
            placeholder="First and last name"
            className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
          />
        </div>
        {errors.name ? (
          <span className="text-danger-400 text-[14px]">
            {errors.name.message}
          </span>
        ) : null}
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="email">Email</label>
        <div className="p-0 m-0 relative w-full">
          <input
            {...register("email", {
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Min. 3 characters",
              },
              maxLength: {
                value: 100,
                message: "Max. 100 characters",
              },
            })}
            type="email"
            placeholder="you@mail.com"
            className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
          />
        </div>
        {errors.email ? (
          <span className="text-danger-400 text-[14px]">
            {errors.email.message}
          </span>
        ) : null}
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="email">Message</label>
        <div className="p-0 m-0 relative w-full">
          <textarea
            {...register("message", {
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Min. 3 characters",
              },
              maxLength: {
                value: 3000,
                message: "Max. 3000 characters",
              },
            })}
            rows={6}
            placeholder="Anything you want to say..."
            className="rounded border w-full border-slate-400 py-2 px-3 pr-14 placeholder:text-sm"
          ></textarea>
        </div>
        {errors.message ? (
          <span className="text-danger-400 text-[14px]">
            {errors.message.message}
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
  );
}
