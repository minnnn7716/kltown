import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn-ui/dialog"

type StatementProps = {
  content: string,
  themeClassName?: string
}

export default function Statement({
  content,
  themeClassName
}: StatementProps) {
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