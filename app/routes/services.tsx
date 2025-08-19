import type { Route } from "./+types/services";
import MainServices from "./Services/MainServices";
import OtherServices from "./Services/OtherServices";
import FAQ from "./Services/FAQ";
import "./Services/Services.css";
import ScrollArrow from "../components/ScrollArrow";
import { smoothScrollTo } from "../components/scrollAnimations";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Services - SiteLVA" },
    { name: "description", content: "Comprehensive health insurance plans, web development, solar solutions, and NIL opportunities. Expert guidance for all your needs." },
  ];
}

export default function Services() {
  return (
    <div className="services-page">
      <MainServices />
      <OtherServices />
      <FAQ />
      <ScrollArrow onClick={() => smoothScrollTo("other-services", 80)} />
    </div>
  );
}
