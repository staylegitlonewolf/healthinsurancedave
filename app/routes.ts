import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("debug", "routes/debug.tsx"),
  route("coming-soon", "routes/coming-soon.tsx"),
  route("services", "routes/services.tsx"),
  route("about", "routes/about.tsx"),
  route("discover", "routes/discover.tsx"),
  route("partners", "routes/partners.tsx"),
] satisfies RouteConfig;
