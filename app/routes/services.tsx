import MainServices from "./Services/MainServices";
import OtherServices from "./Services/OtherServices";
import FAQ from "./Services/FAQ";

export function meta() {
  return [
    { title: "Services - Health Insurance Dave" },
    { name: "description", content: "Comprehensive health insurance plans, web development, solar solutions, and NIL opportunities. Expert guidance for all your needs." },
  ];
}

export default function Services() {
  return (
    <div className="page-layout services-page">
      <div className="page-content">
        <MainServices />
        <OtherServices />
        <FAQ />
      </div>
    </div>
  );
}
