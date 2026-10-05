import PolicyPage from "./PolicyPage";

export default function PrivacyPolicy() {
  return <PolicyPage title="Privacy Policy" intro="We use your information to provide accounts, orders, delivery, and support." sections={[
    { title: "Information we collect", body: "We collect information you provide, including your name, email, phone number, delivery address, and order details." },
    { title: "How we use information", body: "Information is used to authenticate accounts, process orders, provide customer support, and improve the store. We do not sell personal information." },
    { title: "Your choices", body: "You may request account assistance or ask questions about your information through our Contact Us page." },
  ]} />;
}
