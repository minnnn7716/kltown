import { z } from "zod";

export const schema = z.object({
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
  }),
  TurnstileToken: z.string().min(1, "請完成驗證"),
});

export type FormValues = z.infer<typeof schema>;

export type ApiResponse = {
  ok: boolean;
  message: string;
};