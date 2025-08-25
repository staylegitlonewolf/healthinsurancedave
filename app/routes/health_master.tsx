import type { Route } from "./+types/health_master";
import HealthMaster from '../components/healthMaster/HealthMaster';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Health Master - Health Insurance Dave" },
    { name: "description", content: "Health coverage expert details" },
  ];
}

export default function HealthMasterRoute() {
  return <HealthMaster />;
}
