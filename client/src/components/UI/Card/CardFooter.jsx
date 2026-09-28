export default function CardFooter({
    children,
}) {

    return (

        <div
            className="
                mt-6
                border-t
                pt-5
                flex
                justify-end
                gap-3
            "
        >

            {children}

        </div>

    );
}