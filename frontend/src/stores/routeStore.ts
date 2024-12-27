import type { Breadcrumb } from "@/types/breadcrumb";
import { Store, useStore } from "@tanstack/react-store";

type RouteMetadataStore = {
  title: string;
  description: string;
  breadcrumbs: Breadcrumb[];
}

const routeMetadataStore = new Store<RouteMetadataStore>({
  title: "",
  description: "",
  breadcrumbs: [],
});

export function updateRouteMetadata(newState: RouteMetadataStore) {
  routeMetadataStore.setState(() => newState);
}

export function useRouteMetadata() {
  return useStore(routeMetadataStore, (state) => state);
}
