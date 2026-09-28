export default function CardHeader({
    title,
    subtitle,
    action,
}) {

    return (
        <div className="mb-6 flex items-start justify-between">

            <div>

                <h2 className="text-xl font-bold text-[#102B52]">

                    {title}

                </h2>

                {subtitle && (

                    <p className="mt-1 text-slate-500">

                        {subtitle}

                    </p>

                )}

            </div>

            {action}

        </div>
    );
}