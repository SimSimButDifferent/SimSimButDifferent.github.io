import { services } from "@/data/services";

export const dynamic = "force-static";

const BASE_URL = "https://dreaminreality.co.uk";

export default function sitemap() {
  const staticRoutes = ["", "/about", "/contact"];
  const routes = [...staticRoutes, ...services.map(({ slug }) => slug)];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
