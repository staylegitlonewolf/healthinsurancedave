import type { Route } from "./+types/about";
import "./about.css";
import AboutPage from "../components/AboutPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - SiteLVA" },
    { name: "description", content: "Learn more about SiteLVA" },
  ];
}

export default function About() {
  return <AboutPage />;
}
