import { AppStickyNav } from "@/components/nav/AppStickyNav";
import { SiteFooter } from "@/components/SiteFooter";
import { cx } from "@/components/cx";

type SiteChromeProps = {
  children: React.ReactNode;
};

/**
 * Shared chrome for internal marketing routes: ink nav, full-bleed ink backdrop (same language as home), footer.
 */
export function SiteChrome({ children }: SiteChromeProps) {
  return (
    <div className={cx("site-chrome__stack", "is-flex is-flex-column")}>
      <AppStickyNav visible surface="ink" />
      <div className={"site-chrome__backdrop"}>
        <div className={"site-chrome__backdrop-inner"}>{children}</div>
      </div>
      <SiteFooter />
    </div>
  );
}
