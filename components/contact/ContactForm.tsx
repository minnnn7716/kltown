"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Turnstile from "react-turnstile";
import Statement from "./Statement";

import { schema, type FormValues, type ApiResponse } from "./schema"

type ContactFromProps = {
  className?: string;
  projectName?: string;
  themeClassName?: string;
}

export function ContactForm({
  className,
  projectName,
  themeClassName
}: ContactFromProps) {
  const [serverMessage, setServerMessage] = useState("");
  const [, setSubmitOk] = useState<boolean | null>(null);

  const API_URL = "/api/contact";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      InputName: "",
      InputPhone: "",
      InputEmail: "",
      InputMessage: "",
      InputStatement: false as unknown as true,
      TurnstileToken: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setServerMessage("");
    setSubmitOk(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          projectName: projectName ?? ""
        }),
      });

      let data: ApiResponse | null = null;
      try {
        data = (await res.json()) as ApiResponse;
      } catch {
        data = null;
      }

      if (!res.ok || !data) {
        setSubmitOk(false);
        setServerMessage("送出失敗，請稍後再試");
        return;
      }

      setSubmitOk(data.ok);
      setServerMessage(data.message || (data.ok ? "已送出" : "送出失敗"));

      if (data.ok) {
        reset({
          InputName: "",
          InputPhone: "",
          InputEmail: "",
          InputMessage: "",
          InputStatement: false as unknown as true,
          TurnstileToken: "",
        });

        window.setTimeout(() => {
          setServerMessage("");
        }, 5000);
      }
    } catch {
      setSubmitOk(false);
      setServerMessage("送出失敗，請檢查網路或稍後再試");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={`@container grid grid-cols-1 gap-y-3 text-brand ${className}`}
    >
      <div className="grid grid-cols-[5rem_1fr] items-center">
        <label htmlFor="name">姓名 <span>*</span></label>
        <input
          id="name"
          {...register("InputName")}
          className="border-border border p-2"
        />
      </div>

      <div className="grid grid-cols-[5rem_1fr] items-center">
        <label htmlFor="phone">手機 <span>*</span></label>
        <input
          id="phone"
          {...register("InputPhone")}
          className="border-border border p-2"
        />
      </div>

      <div className="grid grid-cols-[5rem_1fr] items-center">
        <label htmlFor="email">信箱 <span>*</span></label>
        <input
          id="email"
          {...register("InputEmail")}
          className="border-border border p-2"
        />
      </div>

      <div className="grid grid-cols-[5rem_1fr] items-center">
        <label htmlFor="message">備註</label>
        <textarea
          id="message"
          {...register("InputMessage")}
          className="border-border border p-2"
          rows={4}
        />
      </div>

      <section className="flex flex-col @min-[500px]:flex-row justify-between">
        <div className="flex items-start gap-x-3">
          <div className="relative mt-1">
            <input
              id="statement"
              type="checkbox"
              {...register("InputStatement")}
              className="peer h-5 w-5 shrink-0 appearance-none rounded-sm border border-neutral-400 bg-white transition-colors duration-200 checked:border-brand checked:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-primary/40 focus-visible:ring-offset-2"
            />
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
            >
              <path
                fill="currentColor"
                d="M6.2 11.4L2.8 8l1.1-1.1 2.3 2.3 5-5L12.3 5z"
              />
            </svg>
          </div>
          <div>
            <label htmlFor="statement">
              我同意
              <Statement
                content="個資告知聲明事項"
                themeClassName={themeClassName}
              />
              <span>*</span>
            </label>
          </div>
        </div>

        <Turnstile
          sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
          size="flexible"
          onVerify={(token) => {
            setValue("TurnstileToken", token, { shouldValidate: true });
          }}
          onExpire={() => {
            setValue("TurnstileToken", "", { shouldValidate: true });
          }}
          onError={() => {
            setValue("TurnstileToken", "", { shouldValidate: true });
          }}
        />
      </section>

      {(() => {
        const errorMessages = Object.values(errors)
          .map((e) => e?.message)
          .filter(Boolean);

        return (
          <div className={`transition-all duration-300 overflow-hidden ${errorMessages.length > 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-red-700">{errorMessages.join('、')}</p>
          </div>
        );
      })()}

      <div className="text-right">
        <button type="submit" disabled={isSubmitting} className="inline-block bg-brand text-white py-1 w-40">
          {isSubmitting ? "送出中..." : "送出"}
        </button>
      </div>

      {serverMessage && <p>{serverMessage}</p>}
    </form>
  );
}

