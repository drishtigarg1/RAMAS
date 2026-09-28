import Container from "../Common/Container";
import FeatureCard from "./FeatureCard";
import features from "./featuresData";

export default function Features() {
  return (
    <section className="py-10 bg-slate-50">
      <Container>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}

        </div>

      </Container>
    </section>
  );
}