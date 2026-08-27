import Link from "next/link";

import { contactCta, primaryNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type DesktopNavigationProps = Readonly<{
  pathname: string;
}>;

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNavigation({ pathname }: DesktopNavigationProps) {
  return (
    <div className="hidden items-center gap-6 lg:flex xl:gap-8">
      <nav aria-label="Navegação principal">
        <ul className="flex items-center gap-5 xl:gap-7">
          {primaryNavigation.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative inline-flex h-12 items-center rounded-sm text-[0.9rem] font-medium text-muted-foreground transition-colors duration-[160ms] hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4",
                    "after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:after:scale-x-100",
                    isActive && "text-primary after:scale-x-100",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Button asChild>
        <Link href={contactCta.href}>{contactCta.label}</Link>
      </Button>
    </div>
  );
}
