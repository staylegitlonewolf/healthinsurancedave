import MainServices from "./Services/MainServices";
import FAQ from "./Services/FAQ";

export function meta() {
  return [
    { title: "Services - Health Insurance Dave" },
    { name: "description", content: "Comprehensive health insurance plans including individual, family, Medicare, Medicaid, and group insurance. Expert guidance for all your health coverage needs." },
  ];
}

export default function Services() {
  return (
    <div className="page-layout services-page">
      <div className="page-content">
        <MainServices />
        <FAQ />
      </div>
    </div>
  );
}
