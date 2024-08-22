"use client"

import { TailSpin } from "react-loader-spinner"

export default function LoadingPage() {
    return (
        <div className="h-[100%] w-[100%] flex justify-center items-center">
            <TailSpin
                visible={true}
                height="50"
                width="50"
                color="hsl(var(--primary))"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}