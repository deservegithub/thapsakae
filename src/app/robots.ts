import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/messages", "/login", "/register", "/appointments"],
      },
    ],
    sitemap: "https://www.thapsakaefocus.com/sitemap.xml",
  };
}
