"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Dispatch, HTMLAttributes, SetStateAction, useState } from "react"

export function DatePickerWithRange({
    className,
    dateRange,
    setDateRange
}: HTMLAttributes<HTMLDivElement> & {
    dateRange: DateRange | undefined
    setDateRange: Dispatch<SetStateAction<DateRange | undefined>>
}) {
    return (
        <div className={cn("grid gap-2", className)}>
            <input type="text" value={dateRange?.from?.toISOString()} className="hidden" name="start"/>
            <input type="text" value={dateRange?.to?.toISOString()} className="hidden" name="end"/>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateRange && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                            dateRange.to ? (
                                <>
                                    {format(dateRange.from, "LLL dd, y")} -{" "}
                                    {format(dateRange.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(dateRange.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        min={2}
                        fromDate={new Date()}
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={1}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
