import PolicyPage from "./PolicyPage";

export default function Terms() {
  return <PolicyPage title="Terms & Conditions" intro="These terms describe the rules for using Rama Stationers & Sports." sections={[
    { title: "Orders", body: "Orders are accepted subject to product availability, address validation, and confirmation by our team. Prices and availability may change before an order is confirmed." },
    { title: "Customer responsibilities", body: "Please provide accurate contact, delivery, and account information. Keep your login credentials private and contact us promptly if you notice unauthorized activity." },
    { title: "Contact", body: "Questions about these terms can be sent through our Contact Us page." },
  ]} />;
}
