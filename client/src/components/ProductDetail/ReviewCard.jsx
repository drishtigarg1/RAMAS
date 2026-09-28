import {
  FiCheckCircle,
  FiThumbsUp,
} from "react-icons/fi";

export default function ReviewCard({ review }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">

      <div className="flex items-center justify-between">

        <div>
          <h3 className="font-semibold">
            {review.name}
          </h3>

          <div className="mt-1 flex text-yellow-400">
            {"★".repeat(review.rating)}
            <span className="text-slate-300">
              {"★".repeat(5 - review.rating)}
            </span>
          </div>
        </div>

        {review.verified && (
          <div className="flex items-center gap-1 text-green-600">
            <FiCheckCircle />
            <span className="text-sm">
              Verified Purchase
            </span>
          </div>
        )}

      </div>

      <p className="mt-4 text-slate-600">
        {review.comment}
      </p>

      <button className="mt-5 flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500">
        <FiThumbsUp />
        Helpful
      </button>

    </div>
  );
}