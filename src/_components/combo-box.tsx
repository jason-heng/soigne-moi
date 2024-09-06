"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/_components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/_components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/_components/ui/popover"
import { cn } from "@/_lib/utils"
import { Dispatch, SetStateAction, useState } from "react"

export interface ComboboxOption {
    label: string
    value: string
}

export function Combobox({ options, selected, setSelected, placeholder, emptyPlaceholder, disabled }: {
    options: ComboboxOption[],
    selected: string | undefined,
    setSelected: Dispatch<SetStateAction<string | undefined>>
    placeholder: string
    emptyPlaceholder: string
    disabled?: boolean
}) {
    const [open, setOpen] = useState(false)

    const selectedOption = options.find(option => option.value === selected)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                    disabled={disabled}
                >
                    {selectedOption?.label ?? placeholder}
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
                    <CommandGroup>
                        {options.map((option) => (
                            <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(currentValue) => {
                                    setSelected(currentValue)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedOption?.value === option.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
