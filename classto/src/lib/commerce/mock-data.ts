import { Product, Collection } from './types';

const defaultCurrency = 'USD';

export const products: Product[] = [
  {
    id: 'prod_obsidian_tee',
    handle: 'the-obsidian-tee',
    title: 'The Obsidian Tee',
    description: 'A curated selection of foundational pieces, defined by technical precision and architectural minimalism.',
    descriptionHtml: '<p>A curated selection of foundational pieces, defined by technical precision and architectural minimalism.</p>',
    fabricDetails: '100% Supima Cotton, 240gsm heavyweight jersey.',
    careInstructions: 'Machine wash cold, lay flat to dry. Do not bleach.',
    fitAndSizing: 'True to size. Model is 6\'1" wearing size L.',
    availableForSale: true,
    options: [
      { id: 'opt_size', name: 'Size', values: ['S', 'M', 'L', 'XL'] },
      { id: 'opt_color', name: 'Color', values: ['Obsidian', 'Bone', 'Ash'] }
    ],
    variants: [
      {
        id: 'var_obsidian_tee_l_obsidian',
        productId: 'prod_obsidian_tee',
        title: 'L / Obsidian',
        sku: 'CL-OBS-TEE-L-BLK',
        availableForSale: true,
        inventoryQty: 50,
        price: { amount: 125, currencyCode: defaultCurrency },
        selectedOptions: [
          { name: 'Size', value: 'L' },
          { name: 'Color', value: 'Obsidian' }
        ]
      }
    ],
    images: [
      { url: '/images/products/obsidian-tee-1.jpg', altText: 'The Obsidian Tee Front' },
      { url: '/images/products/obsidian-tee-2.jpg', altText: 'The Obsidian Tee Detail' }
    ],
    seo: { title: 'The Obsidian Tee | Classto', description: 'Heavyweight Supima cotton tee.' },
    tags: ['Essentials', 'T-Shirt', 'Heavyweight'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod_structure_mockneck',
    handle: 'structure-mockneck',
    title: 'Structure Mockneck',
    description: 'Elevated basics for the modern wardrobe.',
    descriptionHtml: '<p>Elevated basics for the modern wardrobe.</p>',
    fabricDetails: '95% Cotton, 5% Elastane.',
    careInstructions: 'Machine wash cold.',
    fitAndSizing: 'Tailored fit.',
    availableForSale: true,
    options: [
      { id: 'opt_size', name: 'Size', values: ['M', 'L', 'XL'] },
      { id: 'opt_color', name: 'Color', values: ['Bone', 'Obsidian'] }
    ],
    variants: [
      {
        id: 'var_structure_mockneck_l_bone',
        productId: 'prod_structure_mockneck',
        title: 'L / Bone',
        sku: 'CL-MOCK-L-WHT',
        availableForSale: true,
        inventoryQty: 20,
        price: { amount: 140, currencyCode: defaultCurrency },
        selectedOptions: [
          { name: 'Size', value: 'L' },
          { name: 'Color', value: 'Bone' }
        ]
      }
    ],
    images: [
      { url: '/images/products/mockneck-1.jpg', altText: 'Structure Mockneck' }
    ],
    seo: { title: 'Structure Mockneck | Classto', description: 'Structured mockneck tee.' },
    tags: ['Essentials', 'T-Shirt', 'Mockneck'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod_drape_heavyweight',
    handle: 'drape-heavyweight',
    title: 'Drape Heavyweight',
    description: 'An exploration of silhouette and gravity.',
    descriptionHtml: '<p>An exploration of silhouette and gravity.</p>',
    fabricDetails: '100% Cotton, 300gsm.',
    careInstructions: 'Dry clean only.',
    fitAndSizing: 'Oversized fit.',
    availableForSale: true,
    options: [
      { id: 'opt_size', name: 'Size', values: ['S', 'M', 'L'] },
      { id: 'opt_color', name: 'Color', values: ['Ash'] }
    ],
    variants: [
      {
        id: 'var_drape_heavyweight_m_ash',
        productId: 'prod_drape_heavyweight',
        title: 'M / Ash',
        sku: 'CL-DRAPE-M-GRY',
        availableForSale: true,
        inventoryQty: 10,
        price: { amount: 160, currencyCode: defaultCurrency },
        selectedOptions: [
          { name: 'Size', value: 'M' },
          { name: 'Color', value: 'Ash' }
        ]
      }
    ],
    images: [
      { url: '/images/products/drape-1.jpg', altText: 'Drape Heavyweight' }
    ],
    seo: { title: 'Drape Heavyweight | Classto', description: 'Oversized heavyweight tee.' },
    tags: ['Signature', 'T-Shirt', 'Oversized'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod_core_longsleeve',
    handle: 'the-core-longsleeve',
    title: 'The Core Longsleeve',
    description: 'Transitional essential.',
    descriptionHtml: '<p>Transitional essential.</p>',
    fabricDetails: '100% Supima Cotton, 200gsm.',
    careInstructions: 'Machine wash cold.',
    fitAndSizing: 'True to size.',
    availableForSale: false,
    options: [
      { id: 'opt_size', name: 'Size', values: ['M', 'L'] },
      { id: 'opt_color', name: 'Color', values: ['Obsidian'] }
    ],
    variants: [
      {
        id: 'var_core_ls_l_obsidian',
        productId: 'prod_core_longsleeve',
        title: 'L / Obsidian',
        sku: 'CL-LS-L-BLK',
        availableForSale: false,
        inventoryQty: 0,
        price: { amount: 185, currencyCode: defaultCurrency },
        selectedOptions: [
          { name: 'Size', value: 'L' },
          { name: 'Color', value: 'Obsidian' }
        ]
      }
    ],
    images: [
      { url: '/images/products/core-ls-1.jpg', altText: 'Core Longsleeve' }
    ],
    seo: { title: 'The Core Longsleeve | Classto', description: 'Longsleeve essential tee.' },
    tags: ['Essentials', 'Longsleeve'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const collections: Collection[] = [
  {
    id: 'coll_essentials',
    handle: 'essentials',
    title: 'The Essentials',
    description: 'A curated selection of foundational pieces, defined by technical precision and architectural minimalism.',
    seo: { title: 'The Essentials | Classto', description: 'Foundational wardrobe pieces.' },
    updatedAt: new Date().toISOString()
  },
  {
    id: 'coll_signature',
    handle: 'signature-series',
    title: 'Signature Series',
    description: 'Explorations in drape, weight, and form.',
    seo: { title: 'Signature Series | Classto', description: 'Avant-garde silhouettes.' },
    updatedAt: new Date().toISOString()
  }
];
