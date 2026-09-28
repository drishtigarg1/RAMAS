import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "./Sidebar";

export default function MobileSidebar() {

    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="
                    flex
                    items-center
                    gap-2
                    bg-[#102B52]
                    text-white
                    px-4
                    py-3
                    rounded-xl
                "
            >
                <FaBars />

                My Account
            </button>

            {open && (

                <div
                    className="
                        fixed
                        inset-0
                        bg-black/40
                        z-50
                    "
                >

                    <div
                        className="
                            w-72
                            h-full
                            bg-white
                            p-5
                        "
                    >

                        <div className="flex justify-end">

                            <button
                                onClick={() => setOpen(false)}
                            >
                                <FaTimes size={24} />
                            </button>

                        </div>

                        <Sidebar />

                    </div>

                </div>

            )}
        </>
    );
}