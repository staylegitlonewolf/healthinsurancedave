import type { Route } from "./+types/debug";
import DebugPage from "../components/DebugPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Debug - SiteLVA" },
    { name: "robots", content: "noindex" },
  ];
}

export default function Debug() {
  return <DebugPage />;
}


