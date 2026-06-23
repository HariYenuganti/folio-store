import { AddressesClient } from "./addresses-client";

export const metadata = { title: "Addresses" };

export default function AddressesPage() {
  return (
    <div>
      <h2 className="mb-6 font-serif text-2xl">Addresses</h2>
      <AddressesClient />
    </div>
  );
}
