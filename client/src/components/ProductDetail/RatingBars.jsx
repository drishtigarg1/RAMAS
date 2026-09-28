export default function RatingBars() {
  const ratings = [
    { star: 5, value: 78 },
    { star: 4, value: 16 },
    { star: 3, value: 4 },
    { star: 2, value: 1 },
    { star: 1, value: 1 },
  ];

  return (
    <div className="space-y-3">

      {ratings.map((item) => (

        <div
          key={item.star}
          className="flex items-center gap-3"
        >

          <span className="w-6">
            {item.star}★
          </span>

          <div className="h-2 flex-1 rounded-full bg-slate-200">

            <div
              style={{
                width: `${item.value}%`,
              }}
              className="h-full rounded-full bg-yellow-400"
            />

          </div>

          <span className="text-sm text-slate-500">
            {item.value}%
          </span>

        </div>

      ))}

    </div>
  );
}