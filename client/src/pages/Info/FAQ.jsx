import PolicyPage from "./PolicyPage";

export default function FAQ() {
  return <PolicyPage title="Frequently Asked Questions" intro="Quick answers about ordering from Rama Stationers & Sports." sections={[
    { title: "How can I place an order?", body: "Add products to your cart, sign in, provide a delivery address, and choose Cash on Delivery at checkout." },
    { title: "Can I track my order?", body: "Sign in and open My Orders to view the latest status available for your order." },
    { title: "How do I contact support?", body: "Use the Contact Us page to send a message to our team." },
  ]} />;
}
