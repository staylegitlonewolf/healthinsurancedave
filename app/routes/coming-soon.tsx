import type { Route } from "./+types/coming-soon";
import ComingSoon from "../components/ComingSoon";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Coming Soon - SiteLVA" },
    { name: "description", content: "This page is coming soon" },
  ];
}

export default function ComingSoonRoute() {
  return <ComingSoon />;
}


