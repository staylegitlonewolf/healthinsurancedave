import HealthMaster from '../components/healthMaster/HealthMaster';

export function meta() {
  return [
    { title: "Health Master - Insurance Dave" },
    { name: "description", content: "Health coverage expert details" },
  ];
}

export default function HealthMasterRoute() {
  return <HealthMaster />;
}
