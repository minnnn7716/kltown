# KLTown｜共同建設網站改版

企業形象與建案展示網站，使用 Next.js App Router、React 與 TypeScript 開發。整合品牌介紹、服務項目、建案列表與五種建案主題，透過共用版型及資料設定維護各建案內容，並以靜態檔案形式部署。

此儲存庫作為面試作品展示。GitHub 儲存庫名稱為 `kltown`，npm 套件名稱為 `kldown`。

## 功能與實作重點

- **企業官網**：首頁、關於共同、服務項目與建案列表，搭配響應式導覽與版面配置。
- **建案展示系統**：五種獨立 Hero 與主題樣式，共用建案介紹、周邊環境、建案資訊、室內空間及聯絡區塊。
- **資料驅動的頁面組合**：以 `ProjectConfig` 定義資料結構，透過 registry 管理建案與展示順序；選配內容可依資料決定是否顯示。
- **動態路由與靜態產出**：以 `/project/[projectCode]` 統一處理建案頁，使用 `generateStaticParams` 預先產生路由，並驗證未知的建案代碼。
- **互動體驗**：Embla 圖片輪播、AOS 捲動動畫、浮動錨點導覽，以及等待首屏圖片與字型的載入畫面。
- **表單驗證**：React Hook Form 搭配 Zod 檢查輸入，整合 Cloudflare Turnstile 驗證元件與送出狀態。
- **資源處理**：WebP 圖片、自訂字型子集工具及靜態匯出；目前停用 Next.js 伺服器端圖片最佳化。

## 技術組成

| 項目 | 使用技術 |
| --- | --- |
| 框架 | Next.js 16、React 19、TypeScript |
| 樣式 | Tailwind CSS 4、CSS Modules、CSS 主題變數 |
| 介面元件 | shadcn/ui、Lucide React |
| 動畫與輪播 | AOS、Embla Carousel |
| 表單 | React Hook Form、Zod、React Turnstile |
| 交付 | 靜態匯出、IIS Web Deploy、PowerShell |

實際版本以 `package-lock.json` 為準。

## 本機開發

需要 Node.js **20.9 以上**與 npm。只有需要重新產生字型子集時，才需要 Python 與 FontTools。

```bash
git clone https://github.com/minnnn7716/kltown.git
cd kltown
npm ci
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)。建置期間 `next/font/google` 需要連線下載使用的 Google Fonts。

### 環境變數

可在專案根目錄自行建立 `.env.local`：

```dotenv
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
NEXT_PUBLIC_BASE_PATH=
```

| 變數 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile 公開 site key；需允許目前使用的網域。未設定時仍可瀏覽頁面，但驗證與完整表單流程無法正常使用。 |
| `NEXT_PUBLIC_BASE_PATH` | Next.js 部署路徑前綴，預設空字串，代表部署於網域根目錄。 |

`NEXT_PUBLIC_*` 會包含在前端產物中，請勿填入 secret key。修改環境變數後需重新啟動開發伺服器或重新建置。

### 可瀏覽的頁面

| 路徑 | 內容 |
| --- | --- |
| `/` | 官網首頁 |
| `/about/` | 關於共同 |
| `/services/` | 服務項目 |
| `/project/` | 建案列表 |
| `/project/HuaShan/` | 華山藝邸 |
| `/project/OnePark/` | 台中 One Park |
| `/project/LightImperial/` | 宜蘭光御墅 |
| `/project/ChingJe/` | 青喆 SOHO |
| `/project/DuenNan/` | 敦南 SOHO |

建案代碼區分大小寫，展示順序由 `projectOrder` 管理。

## 專案結構

```text
app/
  (main)/                      # 官網共用版型、首頁與主要頁面
  project/
    [projectCode]/
      _components/             # 建案共用區塊
      _data/                   # 型別、registry 與排序
      layout.tsx               # 依建案設定組合頁面、產生標題
      page.tsx                 # 靜態路由參數與建案代碼驗證
    _projects/
      HuaShan/                 # 其他建案採相同目錄結構
        _components/           # 建案專屬 Hero
        config.ts              # 組合主題、元件與資料
        data.tsx               # 建案文案、圖片與內容
        theme.module.css       # 建案主題
components/                    # 導覽、輪播、表單與載入元件
styles/                        # 全域樣式與主題
public/                        # 圖片、字型與 IIS 靜態資源設定
fonts/                         # 原始字型與子集字元清單
scripts/                       # 建案建立／刪除、字型子集工具
```

若要了解設計方式，可先閱讀 `projectTypes.ts`、`projectRegistry.ts` 與建案 `layout.tsx`，再對照各建案的 `config.ts` 及 `data.tsx`。

## 常用指令

| 指令 | 說明 |
| --- | --- |
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 建置並輸出靜態網站至 `out/` |
| `npm run lint` | 執行 ESLint |
| `npm run copy` | 互動式複製建案版型並更新 registry 與排序 |
| `npm run delete` | 互動式移除建案程式目錄並更新 registry 與排序，需輸入 `yes` 確認 |
| `npm run subset-fonts` | 依字元清單產生字型子集 |

### 新增或維護建案

1. 執行 `npm run copy`，選擇來源版型、PascalCase 建案代碼與建案類型。
2. 修改新建案目錄中的 `config.ts`、`data.tsx`、主題與 Hero 元件。
3. 將圖片放入 `public/images/`，更新內容中的圖片路徑；複製工具不會自動複製圖片資源。
4. 視需要調整 `app/project/[projectCode]/_data/projectRegistry.ts` 中的 `projectOrder`。
5. 執行建置並檢查新建案頁面。

刪除工具不會清理 `public/images/`，移除圖片前需確認沒有其他頁面共用。

### 字型子集

```bash
python -m pip install fonttools
npm run subset-fonts
```

工具會配對 `fonts/` 中的字型與 `font-chars-[字型名稱].txt`，產生檔案至 `public/fonts/`。請確認 `pyftsubset`（Windows 為 `pyftsubset.exe`）已加入 PATH。新增文案若使用子集字型，需同步補上字元清單並重新產生字型。

## 建置與部署

`next.config.ts` 設定 `output: 'export'`、`trailingSlash: true` 與 `images.unoptimized: true`。執行 `npm run build` 後，部署 `out/` 內的靜態檔案即可。

若已安裝 Python，可在本機預覽建置結果：

```bash
npm run build
python -m http.server 3000 --directory out
```

先停止佔用 3000 port 的開發伺服器，再開啟 [http://localhost:3000](http://localhost:3000)。目前的 `npm run start` 指向 `next start`，不適用於本專案的靜態匯出模式。

### 既有 IIS 部署工具

部署腳本供既有 Windows／IIS 環境使用，需安裝 Web Deploy 並具備目標伺服器權限。一般面試瀏覽不需要執行部署指令。

| 指令 | 目標 |
| --- | --- |
| `npm run deploy:test` | 測試站台 |
| `npm run deploy:production` | 正式站台 |
| `npm run deploy:test -- -DryRun` | 測試站台部署預演，仍需連線及登入 |

腳本會先建置，再要求部署確認及 AD 帳密。兩個環境目前皆採鏡像同步，可能刪除遠端多餘檔案；使用前應檢查 `deploy-test.ps1` 的站台設定。既有腳本也會略過遠端憑證驗證，移用其他環境時應先調整為有效憑證驗證。

## 展示範圍與限制

- **聯絡表單後端另行提供**：前端會向同網域 `/api/contact` 發送 POST，但此儲存庫未包含該 API。完整送出功能需由外部後端或反向代理提供對應端點，並在伺服器端驗證 Turnstile token。
- **分析追蹤有網域限制**：Google Analytics 僅在 production 模式且網域為 `www.kltown.com` 時載入，本機預覽不會啟用。
- **子目錄部署需另外檢查**：部分資源採用根路徑。若設定非空白 `NEXT_PUBLIC_BASE_PATH`，需同時確認圖片、字型、連結與表單 API 路徑；IIS 腳本的路徑改寫僅涵蓋部分靜態資源。
- **驗證方式**：目前提供 ESLint 指令，尚未配置自動化測試套件。可搭配型別檢查、正式建置及各路由的人工瀏覽驗證。
- **素材使用**：圖片、字型與品牌內容應依各自授權使用；此儲存庫未附開源授權聲明。
