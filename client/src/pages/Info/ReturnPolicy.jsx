import PolicyPage from "./PolicyPage";

export default function ReturnPolicy() {
  return <PolicyPage title="Return Policy" intro="Contact us promptly if an item arrives damaged, incorrect, or materially different from the product description." sections={[
    { title: "Requesting help", body: "Include your order details, a description of the issue, and clear photos where relevant. We will review the request and explain the available resolution." },
    { title: "Eligibility", body: "Return eligibility depends on product condition, category, and the circumstances of the request. Items should be unused and retain their original packaging where possible." },
    { title: "Refunds", body: "Approved refunds and replacements are handled after inspection and confirmation by our team." },
  ]} />;
}
