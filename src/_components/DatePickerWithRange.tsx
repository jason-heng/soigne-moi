"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn, WeekDay } from "@/_lib/utils"
import { Button } from "@/_components/ui/button"
import { Calendar } from "@/_components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/_components/ui/popover"
import { Dispatch, HTMLAttributes, SetStateAction } from "react"

export function DatePickerWithRange({
    className,
    dateRange,
    setDateRange,
    startName,
    endName,
    disabled,
    disabledDates,
    workingDays
}: HTMLAttributes<HTMLDivElement> & {
    dateRange: DateRange | undefined
    setDateRange: Dispatch<SetStateAction<DateRange | undefined>>
    startName: string
    endName: string,
    disabled?: boolean,
    disabledDates?: Date[],
    workingDays?: WeekDay[]
}) {
    return (
        <div className={cn("grid gap-2", className)}>
            <input type="text" value={dateRange?.from?.toISOString()} className="hidden" name={startName} />
            <input type="text" value={dateRange?.to?.toISOString()} className="hidden" name={endName} />
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        disabled={disabled}
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
                            <span>Choisissez une plage de temps</span>
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
                        disabledDates={disabledDates}
                        workingDays={workingDays}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
