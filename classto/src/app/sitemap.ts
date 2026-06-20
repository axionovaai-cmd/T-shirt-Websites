import { MetadataRoute } from "next";
import { getProducts, getCollections } from "@/lib/commerce/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://classto.com";

  // Static routes list
  const staticRoutes = [
    "",
    "/shop",
    "/story",
    "/lookbook",
    "/size-guide",
    "/contact",
    "/cart",
    "/checkout"
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8
  }));

  // Dynamic products
  const products = await getProducts();
  const productRoutes = products.map(product => ({
    url: `${baseUrl}/products/${product.handle}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: "daily" as const,
    priority: 0.7
  }));

  // Dynamic collections
  const collections = await getCollections();
  const collectionRoutes = collections.map(collection => ({
    url: `${baseUrl}/collections/${collection.handle}`,
    lastModified: new Date(collection.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
