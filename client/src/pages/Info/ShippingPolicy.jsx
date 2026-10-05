import PolicyPage from "./PolicyPage";

export default function ShippingPolicy() {
  return <PolicyPage title="Shipping Policy" intro="We deliver stationery, office supplies, and sports products according to the address provided at checkout." sections={[
    { title: "Delivery estimates", body: "Delivery timing depends on location, product availability, and courier conditions. Our team may contact you to confirm delivery details." },
    { title: "Delivery charges", body: "Shipping charges are calculated at checkout. Free shipping eligibility, when available, is shown before the order is placed." },
    { title: "Address accuracy", body: "Please verify your address and phone number before placing an order. Delays caused by an incomplete address may require additional coordination." },
  ]} />;
}
