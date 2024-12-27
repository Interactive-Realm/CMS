import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouteMetadata } from "@/stores/routeStore";
import type { Breadcrumb as BreadcrumbType } from "@/types/breadcrumbTypes";
import { Link } from "@tanstack/react-router";
import { Fragment } from "react";

interface AppBreadcrumbsProps {
  className?: string;
}

export function AppBreadcrumbs({ className }: AppBreadcrumbsProps) {
  const { breadcrumbs } = useRouteMetadata();
  const lastTwoCrumbs = breadcrumbs.slice(breadcrumbs.length === 2 ? -1 : -2);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {breadcrumbs.length > 0 && (
          <BreadcrumbItem>
            <Crumb breadcrumb={breadcrumbs[0]} />
          </BreadcrumbItem>
        )}
        {breadcrumbs.length > 3 ? (
          <>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </>
        ) : (
          <></>
        )}
        {breadcrumbs.length > 1 &&
          lastTwoCrumbs.map((crumb) => (
            <Fragment key={crumb.to}>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <Crumb breadcrumb={crumb} />
            </Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

interface CrumbProps {
  breadcrumb: BreadcrumbType;
}

function Crumb({ breadcrumb }: CrumbProps) {
  return (
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link to={breadcrumb.to}>{breadcrumb.title}</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
}
