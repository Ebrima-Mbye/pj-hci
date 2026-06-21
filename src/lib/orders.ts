export type OrderStatus =
  | "placed"
  | "processing"
  | "packed"
  | "shipped"
  | "out_for_delivery"
  | "delivered";

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface StoredOrder {
  id: string;
  customerName: string;
  email: string;
  address: string;
  city: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  placedAt: number; // unix ms timestamp
}

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  description: string;
  icon: string; // SVG path
}

export const TRACKING_STEPS: TrackingStep[] = [
  {
    status: "placed",
    label: "Order Placed",
    description: "Your order has been received and payment confirmed.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    status: "processing",
    label: "Processing",
    description: "Our team is carefully picking and verifying your items.",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    status: "packed",
    label: "Packed",
    description: "Your items have been packed and are ready to ship.",
    icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
  },
  {
    status: "shipped",
    label: "Shipped",
    description: "Your order is on the move with our delivery partner.",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  },
  {
    status: "out_for_delivery",
    label: "Out for Delivery",
    description: "Almost there! Your order is with the delivery driver.",
    icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
  },
  {
    status: "delivered",
    label: "Delivered",
    description: "Your order has been delivered. Enjoy your purchase!",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
];

export const STATUS_ORDER: OrderStatus[] = [
  "placed",
  "processing",
  "packed",
  "shipped",
  "out_for_delivery",
  "delivered",
];

/**
 * Simulate order progress based on elapsed time since placement.
 * In a real app this would come from the backend.
 */
export function getSimulatedStatus(placedAt: number): OrderStatus {
  const minutes = (Date.now() - placedAt) / 60_000;
  if (minutes < 1) return "placed";
  if (minutes < 3) return "processing";
  if (minutes < 7) return "packed";
  if (minutes < 15) return "shipped";
  if (minutes < 25) return "out_for_delivery";
  return "delivered";
}

/**
 * Get the estimated date label for a tracking step relative to placement time.
 */
export function getStepEstimate(status: OrderStatus, placedAt: number): string {
  const base = new Date(placedAt);
  const offsets: Record<OrderStatus, number> = {
    placed: 0,
    processing: 1,
    packed: 2,
    shipped: 3,
    out_for_delivery: 5,
    delivered: 7,
  };
  const d = new Date(base);
  d.setDate(d.getDate() + offsets[status]);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function generateOrderId(): string {
  const random = Math.floor(10000 + Math.random() * 90000);
  return `NOV-${new Date().getFullYear()}-${random}`;
}

export function saveOrder(order: StoredOrder): void {
  try {
    const existing = getAllOrders();
    existing.unshift(order);
    localStorage.setItem("nova-orders", JSON.stringify(existing.slice(0, 50)));
  } catch {
    // localStorage unavailable (SSR guard)
  }
}

export function getAllOrders(): StoredOrder[] {
  try {
    const raw = localStorage.getItem("nova-orders");
    return raw ? (JSON.parse(raw) as StoredOrder[]) : [];
  } catch {
    return [];
  }
}

export function findOrderById(id: string): StoredOrder | null {
  return (
    getAllOrders().find(
      (o) => o.id.toLowerCase() === id.trim().toLowerCase(),
    ) ?? null
  );
}
