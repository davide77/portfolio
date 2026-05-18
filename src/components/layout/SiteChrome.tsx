import { AppStickyNav } from "@/components/nav/AppStickyNav";
import { SiteFooter } from "@/components/SiteFooter";
import { cx } from "@/components/cx";
import styles from "./SiteChrome.module.scss";

type SiteChromeProps = {
  children: React.ReactNode;
};

/**
 * Shared chrome for internal marketing routes: ink nav, full-bleed ink backdrop (same language as home), footer.
 */
export function SiteChrome({ children }: SiteChromeProps) {
  return (
    <div className={cx(styles.stack, "is-flex is-flex-column")}>
      <AppStickyNav visible surface="ink" />
      <div className={styles.backdrop}>
        <div className={styles.backdropInner}>{children}</div>
      </div>
      <SiteFooter />
    </div>
  );
}
