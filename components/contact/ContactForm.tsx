"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn-ui/dialog"
import { type ProjectCode } from "@/app/project/[projectCode]/_data/projectRegistry";

const schema = z.object({
  InputName: z.string().trim().min(1, "請輸入姓名").max(50, "姓名最多 50 字"),
  InputPhone: z
    .string()
    .trim()
    .min(1, "請輸入聯絡電話")
    .max(30, "電話最多 30 字")
    .regex(/^[0-9+()\-#\s]{6,30}$/, "電話格式不正確"),
  InputEmail: z.email("電子郵件格式錯誤").trim().max(100, "電子郵件最多 100 字"),
  InputMessage: z
    .string()
    .trim()
    .max(2000, "留言內容最多 2000 字")
    .optional(),
  InputStatement: z.literal(true, {
    message: "請確認個資告知聲明事項",
  })
});

type FormValues = z.infer<typeof schema>;

type ApiResponse = {
  ok: boolean;
  message: string;
};

type ContactFromProps = {
  className?: string;
  projectCode: ProjectCode;
  themeClassName: string;
}

export function ContactForm({
  className,
  projectCode,
  themeClassName
}: ContactFromProps) {
  const [serverMessage, setServerMessage] = useState("");
  const [, setSubmitOk] = useState<boolean | null>(null);

  const API_URL =
    process.env.NEXT_PUBLIC_CONTACT_API_URL || "/KLTown/ContactMessageApi";

  const {
    register,
    handleSubmit,
    reset,
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
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    // 如果有錯誤，不發送 API
    if (Object.keys(errors).length > 0) {
      return;
    }

    setServerMessage("");
    setSubmitOk(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          projectCode: projectCode ?? ""
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
        });
      }
    } catch {
      setSubmitOk(false);
      setServerMessage("送出失敗，請檢查網路或稍後再試");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={className}>
      <div className="grid grid-cols-[5rem_1fr] items-center">
        <label htmlFor="name">姓名 <span>*</span></label>
        <input
          id="name"
          {...register("InputName")}
          className="border p-2"
        />
      </div>

      <div className="grid grid-cols-[5rem_1fr] items-center">
        <label htmlFor="phone">手機 <span>*</span></label>
        <input
          id="phone"
          {...register("InputPhone")}
          className="border p-2"
        />
      </div>

      <div className="grid grid-cols-[5rem_1fr] items-center">
        <label htmlFor="email">信箱 <span>*</span></label>
        <input
          id="email"
          {...register("InputEmail")}
          className="border p-2"
        />
      </div>

      <div className="grid grid-cols-[5rem_1fr] items-center">
        <label htmlFor="message">備註</label>
        <textarea
          id="message"
          {...register("InputMessage")}
          className="border p-2"
          rows={4}
        />
      </div>

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
          <p className="text-sm text-brand-600">提醒您送出資料即視為同意本公司網站之「隱私權政策」</p>
        </div>
      </div>

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

type StatementProps = {
  content: string,
  themeClassName: string
}

const Statement = ({
  content,
  themeClassName
}: StatementProps) => {

  return (
    <Dialog>
      <DialogTrigger>
        <span className="underline hover:text-brand-600 transition-colors">{content}</span>
      </DialogTrigger>
      <DialogContent className={themeClassName}>
        <DialogHeader>
          <DialogTitle>個人資料蒐集告知事項及同意書</DialogTitle>
        </DialogHeader>
        <div className="grid gap-y-4">
          <p>
            共同建設股份有限公司（以下簡稱本公司）茲依據個人資料保護法規定，告知下列事項：
          </p>

          <ol className="list-[cjk-ideographic] ml-7 grid gap-y-2">
            <li>
              <span className="text-brand font-medium">蒐集目的：</span>履行契約、消費者、客戶管理與服務、行銷、以及本公司登記業務範圍內之業務服務。
            </li>
            <li>
              <span className="text-brand font-medium">資料類別：</span>當事人之姓名、出生年月日、國民身分證統一編號、護照號碼、聯絡方式及其他得以直接或間接方式識別該當事人之資料。
            </li>
            <li>
              <span className="text-brand font-medium">利用期間、地區、對象及方式：</span>

              <ol className="list-decimal ml-4 grid gap-y-1">
                <li>期間：依相關法令或契約約定之保存年限，或本公司因執行業務所必須之保存期間。</li>
                <li>地區：本公司、分公司、本公司之關係企業所在地區，及履行契約、提供當事人服務所需之地區。</li>
                <li>對象：本公司、分公司、本公司所屬之關係企業、其他與本公司有業務往來之機構及依法有調查權之機關。</li>
                <li>方式：以自動化機器或其他非自動化方式為之。</li>
              </ol>
            </li>
            <li>
              <span className="text-brand font-medium">當事人權利：</span>

              <ol className="list-decimal ml-4 grid gap-y-1">
                <li>得請求查詢、閱覽、複製、補充、更正其個人資料。</li>
                <li>得請求停止或刪除其個人資料。惟依法本公司因執行業務所必須者，不在此限。</li>
                <li>當事人得自由選擇提供個人資料，惟若拒絕提供、或提供之資料不足或有誤時，可能會影響當事人權利的行使，或無法提供當事人相關服務。</li>
              </ol>
            </li>
          </ol>

          <p className="text-brand font-medium">
            本人已充分瞭解貴公司所提示之個人資料告知事項內容，並同意貴公司依上述告知事項，得蒐集、處理、利用、國際傳輸本人之個人資料。
          </p>

          <h3 className="text-lg text-brand font-medium">此致 共同建設股份有限公司</h3>
        </div>
      </DialogContent>
    </Dialog>
  )
} 