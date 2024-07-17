"use client"

import { getStays } from "@/_data/stays"
import { useState } from "react"
import { Stays } from "./Stays"
import { SelectedPrescription } from "./SelectedPrescription"

export function HistoryCard({ stays }: { stays: Awaited<ReturnType<typeof getStays>> }) {
    const [selectedStay, setSelectedStay] = useState<Awaited<ReturnType<typeof getStays>>[0]>()

    return (
        <div className='flex-1 p-8 h-screen'>
            <h1 className='text-xl font-semibold'>L&apos;historique de vos séjours</h1>
            <div className='flex flex-1 gap-5 h-[90%] mt-5'>
                <Stays stays={stays} selected={selectedStay} setSelected={setSelectedStay} />
                <SelectedPrescription stay={selectedStay} />
            </div >
        </div >
    )
}



