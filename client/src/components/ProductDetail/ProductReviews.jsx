import RatingBars from "./RatingBars";
import ReviewCard from "./ReviewCard";

export default function ProductReviews() {

  const reviews = [
    {
      id: 1,
      name: "Amit Kumar",
      rating: 5,
      verified: true,
      comment:
        "Excellent quality. Perfect for school use.",
    },
    {
      id: 2,
      name: "Priya Singh",
      rating: 4,
      verified: true,
      comment:
        "Fast delivery and genuine product.",
    },
    {
      id: 3,
      name: "Rahul Verma",
      rating: 5,
      verified: false,
      comment:
        "Very good packaging and reasonable price.",
    },
  ];

  return (
    <section className="mt-14">

      <h2 className="mb-8 text-3xl font-bold text-[#102B52]">
        Customer Reviews
      </h2>

      <div className="grid gap-10 lg:grid-cols-[350px_1fr]">

        <div className="rounded-3xl border bg-white p-6">

          <h3 className="text-5xl font-bold">
            4.8
          </h3>

          <p className="mt-2 text-yellow-400 text-xl">
            ★★★★★
          </p>

          <p className="mt-2 text-slate-500">
            Based on 256 Reviews
          </p>

          <div className="mt-8">
            <RatingBars />
          </div>

        </div>

        <div className="space-y-6">

          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
            />
          ))}

        </div>

      </div>

    </section>
  );
}