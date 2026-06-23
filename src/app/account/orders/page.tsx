import { OrdersClient } from "./orders-client";

export const metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <div>
      <h2 className="mb-6 font-serif text-2xl">Orders</h2>
      <OrdersClient />
    </div>
  );
}
