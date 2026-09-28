import { FaUserCircle } from "react-icons/fa";

export default function UserCard() {

    return (
        <div className="text-center border-b pb-6">

            <FaUserCircle
                className="
                    text-7xl
                    text-[#102B52]
                    mx-auto
                "
            />

            <h3 className="mt-4 text-xl font-bold">

                Roshan Kumar Singh

            </h3>

            <p className="text-sm text-slate-500">

                roshan@example.com

            </p>

            <div
                className="
                    mt-3
                    inline-flex
                    px-3
                    py-1
                    rounded-full
                    bg-blue-100
                    text-blue-700
                    text-xs
                    font-semibold
                "
            >

                Premium Customer

            </div>

        </div>
    );
}