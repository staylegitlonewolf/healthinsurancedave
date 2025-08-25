import type { Route } from "./+types/certification_master";
import CertificationMaster from "../components/certificationMaster/CertificationMaster";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Certification Details - Health Insurance Dave" },
    { name: "description", content: "View detailed certification information" },
  ];
}

export default function CertificationMasterRoute() {
  return <CertificationMaster />;
}
