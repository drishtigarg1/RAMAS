import Container from "../Common/Container";
import HeroSlider from "./HeroSlider";
import HeroCards from "./HeroCards";
import HeroFeatures from "./HeroFeatures";

export default function Hero() {
  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        bg-gradient-to-b
        from-slate-50
        via-white
        to-slate-100
        py-8
        lg:py-10
      "
    >
      {/* Background Decoration */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-200/20 blur-3xl" />

      <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-blue-200/20 blur-3xl" />

      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/20 blur-3xl" />

      {/* Grid Pattern */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
          [background-image:linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]
          [background-size:40px_40px]
        "
      />

      <Container>

        {/* Main Banner */}
        <div className="relative z-10">
          <HeroSlider />
        </div>

        {/* Category Cards */}
        <div className="relative z-10 mt-8">
          <HeroCards />
        </div>

        {/* Features */}
        <div className="relative z-10 mt-8">
          <HeroFeatures />
        </div>

      </Container>
    </section>
  );
}