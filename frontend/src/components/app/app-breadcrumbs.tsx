import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, useState } from "react";

interface AppBreadcrumbsProps {
  className?: string;
}

export function AppBreadcrumbs({ className }: AppBreadcrumbsProps) {
  const [crumbs, setCrumbs] = useState([{ path: "/home" }]);
  const lastTwoCrumbs = crumbs.slice(-2);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Crumb route="Home" />
        </BreadcrumbItem>
        {crumbs.length > 2 ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </>
        ) : (
          <></>
        )}
        {lastTwoCrumbs.map((crumb) => (
          <Fragment key={crumb.path}>
            <BreadcrumbSeparator />
            <Crumb route={crumb.path} />
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

interface CrumbProps {
  route: string;
}

function Crumb({ route }: CrumbProps) {
  return (
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link to={route}>{route}</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
}
