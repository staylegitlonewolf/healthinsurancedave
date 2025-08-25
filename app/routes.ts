import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("debug", "routes/debug.tsx"),
  route("coming-soon", "routes/coming-soon.tsx"),
  route("services", "routes/services.tsx"),
  route("about", "routes/about.tsx"),
  route("certifications", "routes/certifications.tsx"),
  route("certification_master", "routes/certification_master.tsx"),
  route("health_master", "routes/health_master.tsx"),
  route("solar_master", "components/solarMaster/SolarMaster.tsx"),
  route("nil_master", "components/nilMaster/NILMaster.tsx"),
  route("discover", "routes/discover.tsx"),
  route("contact", "routes/contact.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("terms", "routes/terms.tsx"),
  route("disclaimer", "routes/disclaimer.tsx"),
] satisfies RouteConfig;
