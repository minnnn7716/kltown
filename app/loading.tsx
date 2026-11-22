import styles from "@/components/GlobalLoading.module.css";

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="頁面載入中"
      className="fixed inset-0 z-9999 flex items-center justify-center bg-[#edf0f4]"
    >
      <span className={styles.loader} />
    </div>
  );
}
