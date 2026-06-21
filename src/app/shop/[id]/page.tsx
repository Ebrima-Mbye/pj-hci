import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById, getRelatedProducts, products } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id.toString() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) return { title: "Product Not Found – NOVA Store" };
  return {
    title: `${product.name} – NOVA Store`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(Number(id));

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.id, product.category);

  return <ProductDetailClient product={product} related={related} />;
}
