export interface Image {
  url: string;
  altText: string;
  width?: number;
  height?: number;
}

export interface Money {
  amount: number;
  currencyCode: string;
}

export interface SEO {
  title: string;
  description: string;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface Variant {
  id: string;
  productId: string;
  title: string;
  sku: string;
  availableForSale: boolean;
  inventoryQty: number;
  price: Money;
  compareAtPrice?: Money;
  selectedOptions: SelectedOption[];
  image?: Image;
}

export interface Product {
  id: string;
  handle: string; // slug
  title: string;
  description: string;
  descriptionHtml: string;
  fabricDetails?: string;
  careInstructions?: string;
  fitAndSizing?: string;
  availableForSale: boolean;
  options: ProductOption[];
  variants: Variant[];
  images: Image[];
  seo: SEO;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  image?: Image;
  updatedAt: string;
}

export interface CartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: Variant & { product: Pick<Product, "id" | "handle" | "title" | "images"> };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: CartLine[];
  totalQuantity: number;
}
