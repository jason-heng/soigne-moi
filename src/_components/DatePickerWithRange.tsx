"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn, formatDate, getWeekday, WeekDay } from "@/_lib/utils"
import { Button } from "@/_components/ui/button"
import { Calendar } from "@/_components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/_components/ui/popover"
import { Dispatch, HTMLAttributes, SetStateAction } from "react"

export function DatePickerWithRange({
    placeholder,
    className,
    selected,
    setSelected,
    disabled,
    disabledDates,
    availableDays,
}: HTMLAttributes<HTMLDivElement> & {
    placeholder: string
    selected: DateRange | undefined
    setSelected: Dispatch<SetStateAction<DateRange | undefined>>
    disabled?: boolean,
    disabledDates?: Date[],
    availableDays?: WeekDay[]
}) {
    let prevDisabledDate: Date | null = null
    let nextDisabledDate: Date | null = null

    let prevUnavailableDate: Date | null = null
    let nextUnavailableDate: Date | null = null

    if (selected?.from) {
        if (disabledDates) {
            for (const disabledDate of disabledDates) {
                if (disabledDate < selected.from) {
                    if (!prevDisabledDate || disabledDate > prevDisabledDate) {
                        prevDisabledDate = disabledDate
                    }
                }

                if (disabledDate > selected.from) {
                    if (!nextDisabledDate || disabledDate < nextDisabledDate) {
                        nextDisabledDate = disabledDate
                    }
                }
            }
        }

        if (availableDays) {
            for (let i = 1; i <= 7; i++) {
                const date = new Date(selected.from)
                date.setDate(date.getDate() + i)

                if (!availableDays.includes(getWeekday(date))) {
                    nextUnavailableDate = date
                    break
                }
            }

            for (let i = 1; i <= 7; i++) {
                const date = new Date(selected.from)
                date.setDate(date.getDate() - i)

                if (!availableDays.includes(getWeekday(date))) {
                    prevUnavailableDate = date
                    break
                }
            }
        }
    }

    function handleDisabledDates(day: Date) {
        if (!disabledDates) return false

        if (availableDays) {
            if (!availableDays.includes(getWeekday(day))) return true
        }

        if (disabledDates.find(date => formatDate(date) === formatDate(day))) return true

        if (prevDisabledDate && day < prevDisabledDate) return true
        if (nextDisabledDate && day > nextDisabledDate) return true

        if (prevUnavailableDate && day < prevUnavailableDate) return true
        if (nextUnavailableDate && day > nextUnavailableDate) return true

        return false
    }

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        disabled={disabled}
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !selected && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selected?.from ? (
                            selected.to ? (
                                <>
                                    {formatDate(selected.from)} - {formatDate(selected.to)}
                                </>
                            ) : (
                                formatDate(selected.from)
                            )
                        ) : (
                            <>{placeholder}</>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        min={2}
                        fromDate={new Date()}
                        mode="range"
                        defaultMonth={selected?.from}
                        selected={selected}
                        onSelect={setSelected}
                        numberOfMonths={1}
                        disabled={handleDisabledDates}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
