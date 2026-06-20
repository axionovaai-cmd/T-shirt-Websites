import { Product, Collection } from './types';
import { products, collections } from './mock-data';

export async function getProducts(): Promise<Product[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return products.find(p => p.handle === slug);
}

export async function getCollections(): Promise<Collection[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return collections;
}

export async function getCollectionBySlug(slug: string): Promise<Collection | undefined> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return collections.find(c => c.handle === slug);
}

export async function getRelatedProducts(productId: string): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  return products.filter(p => p.id !== productId).slice(0, 4);
}

export async function searchProducts(query: string): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) || 
    p.description.toLowerCase().includes(lowerQuery)
  );
}
