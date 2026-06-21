export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  features: string[];
  badge?: string;
  inStock: boolean;
}

export const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Home & Living",
  "Beauty",
];

export const products: Product[] = [
  // Electronics
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 129.99,
    originalPrice: 199.99,
    category: "Electronics",
    rating: 4.8,
    reviews: 2341,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cups designed for all-day wear.",
    features: [
      "Active Noise Cancellation",
      "30hr Battery Life",
      "Bluetooth 5.0",
      "Foldable Design",
    ],
    badge: "Sale",
    inStock: true,
  },
  {
    id: 2,
    name: "Ultra-Slim Laptop Pro",
    price: 1299.99,
    category: "Electronics",
    rating: 4.9,
    reviews: 876,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop",
    description:
      "Power and portability redefined. This ultra-slim laptop packs a punch with its latest-gen processor, stunning OLED display, and all-day battery life in a featherlight chassis.",
    features: ["Intel Core i7", "16GB RAM", "512GB SSD", '14" OLED Display'],
    badge: "New",
    inStock: true,
  },
  {
    id: 3,
    name: "Smartphone X Pro",
    price: 899.99,
    originalPrice: 999.99,
    category: "Electronics",
    rating: 4.7,
    reviews: 5621,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
    description:
      "The smartest phone we've ever made. Featuring a triple-lens camera system, all-day battery, and the fastest chip yet — the Smartphone X Pro does it all.",
    features: [
      "108MP Camera System",
      "5000mAh Battery",
      "5G Ready",
      '6.7" AMOLED Display',
    ],
    badge: "Sale",
    inStock: true,
  },
  {
    id: 4,
    name: "Smart Watch Series 5",
    price: 349.99,
    originalPrice: 449.99,
    category: "Electronics",
    rating: 4.6,
    reviews: 1893,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    description:
      "Stay connected, healthy, and on-time with our most capable smartwatch. Track workouts, monitor your health, and receive notifications — all from your wrist.",
    features: [
      "Heart Rate Monitor",
      "Built-in GPS",
      "7-Day Battery",
      "50m Water Resistance",
    ],
    badge: "Sale",
    inStock: true,
  },
  {
    id: 5,
    name: "Wireless Earbuds Pro",
    price: 89.99,
    category: "Electronics",
    rating: 4.5,
    reviews: 3204,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
    description:
      "True wireless freedom with pro-grade sound. These earbuds deliver immersive audio, active noise cancellation, and up to 28 hours total playback with the charging case.",
    features: [
      "Active Noise Cancellation",
      "28hr Total Playback",
      "IPX5 Waterproof",
      "Touch Controls",
    ],
    inStock: true,
  },
  {
    id: 6,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    category: "Electronics",
    rating: 4.4,
    reviews: 1456,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    description:
      "Big sound in a small package. Take your music anywhere with this rugged, waterproof portable speaker featuring 360° audio and 20-hour battery life.",
    features: [
      "360° Surround Sound",
      "20hr Battery Life",
      "IPX7 Waterproof",
      "Compact & Lightweight",
    ],
    inStock: true,
  },

  // Clothing
  {
    id: 7,
    name: "Classic White T-Shirt",
    price: 29.99,
    category: "Clothing",
    rating: 4.6,
    reviews: 4521,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    description:
      "The perfect everyday essential. Made from 100% organic cotton, this classic tee offers unmatched comfort and durability — a wardrobe staple you'll reach for every day.",
    features: [
      "100% Organic Cotton",
      "Pre-shrunk Fabric",
      "Unisex Relaxed Fit",
      "Machine Washable",
    ],
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 8,
    name: "Premium Leather Jacket",
    price: 299.99,
    originalPrice: 399.99,
    category: "Clothing",
    rating: 4.8,
    reviews: 892,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
    description:
      "Timeless style meets modern craftsmanship. This premium leather jacket is built to last, with supple genuine leather, a tailored silhouette, and rich hardware accents.",
    features: [
      "Genuine Leather",
      "YKK Premium Zippers",
      "Quilted Inner Lining",
      "Multiple Pockets",
    ],
    badge: "Sale",
    inStock: true,
  },
  {
    id: 9,
    name: "Slim Fit Chinos",
    price: 59.99,
    category: "Clothing",
    rating: 4.4,
    reviews: 2103,
    image:
      "https://images.unsplash.com/photo-1542319631-2b02ad9fcbb4?w=500&h=500&fit=crop",
    description:
      "Versatile, stylish, and incredibly comfortable. These slim-fit chinos go from office to weekend effortlessly, with a stretch-cotton blend that moves with you.",
    features: [
      "Stretch Cotton Blend",
      "Slim Tapered Fit",
      "Available in 4 Colors",
      "Machine Washable",
    ],
    inStock: true,
  },
  {
    id: 10,
    name: "Classic Sneakers",
    price: 119.99,
    originalPrice: 149.99,
    category: "Clothing",
    rating: 4.7,
    reviews: 3876,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    description:
      "Clean, iconic, and endlessly versatile. These classic sneakers pair perfectly with any outfit and feature a cushioned sole for all-day comfort.",
    features: [
      "Premium Leather Upper",
      "Memory Foam Insole",
      "Durable Rubber Sole",
      "Unisex Sizing",
    ],
    badge: "Sale",
    inStock: true,
  },
  {
    id: 11,
    name: "Designer Handbag",
    price: 189.99,
    category: "Clothing",
    rating: 4.5,
    reviews: 1234,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    description:
      "Carry your essentials in style. This structured handbag features premium vegan leather, a spacious interior, and elegant gold-tone hardware.",
    features: [
      "Premium Vegan Leather",
      "Gold-tone Hardware",
      "Interior Zip Pockets",
      "Detachable Shoulder Strap",
    ],
    badge: "New",
    inStock: true,
  },
  {
    id: 12,
    name: "Polarized Sunglasses",
    price: 79.99,
    category: "Clothing",
    rating: 4.6,
    reviews: 987,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
    description:
      "Protect your eyes in style. These polarized sunglasses feature UV400 protection, impact-resistant lenses, and a lightweight acetate frame.",
    features: [
      "UV400 Protection",
      "Polarized Lenses",
      "Lightweight Acetate Frame",
      "Unisex Design",
    ],
    inStock: true,
  },

  // Home & Living
  {
    id: 13,
    name: "Minimalist Desk Lamp",
    price: 49.99,
    category: "Home & Living",
    rating: 4.7,
    reviews: 1876,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    description:
      "Light up your workspace with style. This minimalist LED desk lamp offers adjustable brightness, color temperature control, and a sleek, space-saving design.",
    features: [
      "LED Technology",
      "Adjustable Brightness",
      "USB-A Charging Port",
      "Touch Controls",
    ],
    inStock: true,
  },
  {
    id: 14,
    name: "Luxury Velvet Cushion Set",
    price: 39.99,
    category: "Home & Living",
    rating: 4.5,
    reviews: 2341,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop",
    description:
      "Add a touch of luxury to your living space. These premium velvet cushions come in a set of 2, with plush filling and vibrant, fade-resistant covers.",
    features: [
      "Premium Velvet Fabric",
      "Set of 2 Cushions",
      "Removable Zip Cover",
      "Hypoallergenic Fill",
    ],
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 15,
    name: "Ceramic Coffee Mug",
    price: 19.99,
    category: "Home & Living",
    rating: 4.8,
    reviews: 5432,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop",
    description:
      "Start every morning right. This handcrafted ceramic mug holds 14oz of your favorite brew and features a comfortable grip and beautiful matte finish.",
    features: [
      "14oz Capacity",
      "Dishwasher Safe",
      "Microwave Safe",
      "Handcrafted Ceramic",
    ],
    inStock: true,
  },
  {
    id: 16,
    name: "Indoor Succulent Plant",
    price: 24.99,
    category: "Home & Living",
    rating: 4.6,
    reviews: 876,
    image:
      "https://images.unsplash.com/photo-1453545214710-84a6a6e0da36?w=500&h=500&fit=crop",
    description:
      "Bring nature indoors. This beautiful succulent arrangement comes in a handmade ceramic pot and requires minimal care — perfect for any space.",
    features: [
      "Low Maintenance",
      "Ceramic Pot Included",
      "Pet Friendly",
      "Air Purifying",
    ],
    badge: "New",
    inStock: true,
  },
  {
    id: 17,
    name: "Soy Wax Candle Set",
    price: 34.99,
    category: "Home & Living",
    rating: 4.9,
    reviews: 3219,
    image:
      "https://images.unsplash.com/photo-1603201667141-5a2d4c673b07?w=500&h=500&fit=crop",
    description:
      "Fill your home with beautiful fragrance. Hand-poured from 100% natural soy wax, these candles burn cleanly and evenly, filling your space with complex, lasting scents.",
    features: [
      "100% Natural Soy Wax",
      "Cotton Wick",
      "45hr Burn Time",
      "Set of 3 Scents",
    ],
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 18,
    name: "Minimalist Wall Clock",
    price: 44.99,
    category: "Home & Living",
    rating: 4.4,
    reviews: 654,
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=500&h=500&fit=crop",
    description:
      "Classic meets contemporary. This minimalist wall clock features a silent quartz movement, clean dial design, and a solid wood frame that complements any interior.",
    features: [
      "Silent Quartz Movement",
      "Solid Wood Frame",
      '12" Diameter',
      "Battery Powered",
    ],
    inStock: true,
  },

  // Beauty
  {
    id: 19,
    name: "Vitamin C Brightening Serum",
    price: 44.99,
    originalPrice: 59.99,
    category: "Beauty",
    rating: 4.8,
    reviews: 4321,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
    description:
      "Reveal your most radiant skin. This potent vitamin C serum fades dark spots, evens skin tone, and provides powerful antioxidant protection — all in one lightweight formula.",
    features: [
      "15% Vitamin C",
      "Hyaluronic Acid",
      "100% Vegan Formula",
      "Dermatologist Tested",
    ],
    badge: "Sale",
    inStock: true,
  },
  {
    id: 20,
    name: "Luxury Perfume Noir",
    price: 89.99,
    category: "Beauty",
    rating: 4.7,
    reviews: 2198,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=500&h=500&fit=crop",
    description:
      "A sophisticated blend of oud, sandalwood, and amber notes that leaves a lasting, memorable impression. Designed for those who appreciate the art of fine fragrance.",
    features: [
      "Eau de Parfum",
      "50ml / 100ml Options",
      "Long-lasting Sillage",
      "Luxury Gift Box",
    ],
    badge: "New",
    inStock: true,
  },
  {
    id: 21,
    name: "Deep Moisture Face Cream",
    price: 38.99,
    category: "Beauty",
    rating: 4.6,
    reviews: 3087,
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
    description:
      "Clinically proven to provide 72-hour hydration. This rich yet fast-absorbing cream locks in moisture, reduces fine lines, and leaves skin feeling silky smooth.",
    features: [
      "72hr Hydration",
      "Fragrance Free Formula",
      "Suitable for All Skin Types",
      "Clinically Tested",
    ],
    inStock: true,
  },
  {
    id: 22,
    name: "Natural Lip Care Set",
    price: 22.99,
    category: "Beauty",
    rating: 4.5,
    reviews: 1876,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop",
    description:
      "Keep lips soft, supple, and protected all day. This set includes a nourishing lip balm and tinted lip butter made with 100% natural ingredients.",
    features: [
      "100% Natural Ingredients",
      "SPF 15 Protection",
      "Set of 3 Shades",
      "Cruelty Free",
    ],
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 23,
    name: "Hair Care Gift Set",
    price: 54.99,
    originalPrice: 74.99,
    category: "Beauty",
    rating: 4.7,
    reviews: 987,
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=500&h=500&fit=crop",
    description:
      "Treat your hair to the care it deserves. This complete gift set includes a nourishing shampoo, conditioner, and hair mask formulated for all hair types.",
    features: [
      "Sulfate Free",
      "All Hair Types",
      "Premium Gift Box",
      "Cruelty Free",
    ],
    badge: "Sale",
    inStock: true,
  },
  {
    id: 24,
    name: "Eye Cream Revitalizer",
    price: 32.99,
    category: "Beauty",
    rating: 4.4,
    reviews: 1543,
    image:
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&h=500&fit=crop",
    description:
      "Brighten, firm, and de-puff the delicate eye area. This targeted eye cream contains caffeine, retinol, and peptides to visibly reduce dark circles and fine lines.",
    features: [
      "Caffeine + Retinol",
      "Reduces Dark Circles",
      "Fragrance Free",
      "Ophthalmologist Tested",
    ],
    inStock: true,
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(id: number, category: string): Product[] {
  return products
    .filter((p) => p.category === category && p.id !== id)
    .slice(0, 4);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badge).slice(0, 8);
}
