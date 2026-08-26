import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkProps = Omit<RouterLinkProps, "to"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    children?: ReactNode;
  };

function isExternal(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  );
}

/** Compatível com a API `href` do Next.js Link. */
export function Link({ href, children, ...props }: LinkProps) {
  if (isExternal(href)) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={href} {...props}>
      {children}
    </RouterLink>
  );
}
