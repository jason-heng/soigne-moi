"use client"

import { getStays } from "@/_data/stays"
import { useEffect, useRef, useState } from "react"
import { Stays } from "./Stays"
import { SelectedPrescription } from "./SelectedPrescription"

export function HistoryCard({ stays }: { stays: Awaited<ReturnType<typeof getStays>> }) {
    const [selectedStay, setSelectedStay] = useState<Awaited<ReturnType<typeof getStays>>[0]>()

    // Handle clicks outside of the stay details or stay items
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                !(event.target as any).closest('#prescription')
                &&
                !(event.target as any).closest('#stay')
                &&
                !(event.target as any).id.includes("search")
            ) {
                setSelectedStay(undefined);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='flex-1 p-5 h-screen flex flex-col gap-5'>
            <h1 className='text-xl font-semibold'>L&apos;historique de vos séjours</h1>
            <div className='flex flex-1 gap-5 min-h-0'>
                <Stays stays={stays} selected={selectedStay} setSelected={setSelectedStay} />
                <SelectedPrescription stay={selectedStay} />
            </div >
        </div >
    )
}



