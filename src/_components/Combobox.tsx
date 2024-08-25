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
    id: number
    worksSunday: boolean,
    worksMonday: boolean,
    worksTuesday: boolean,
    worksWednesday: boolean,
    worksThursday: boolean,
    worksFriday: boolean,
    worksSaturday: boolean,
}

export function Combobox({ options, selected, setSelected, name }: {
    options: ComboboxOption[],
    selected: ComboboxOption | undefined,
    setSelected: Dispatch<SetStateAction<ComboboxOption | undefined>>
    name: string
}) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <input type="text" className="hidden" name={name} value={selected?.id} />
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {selected?.label ?? "Chercher un docteur..."}
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder="Chercher un docteur..." />
                    <CommandEmpty>Aucun docteur trouvé.</CommandEmpty>
                    <CommandGroup>
                        {options.map((option) => (
                            <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(currentValue) => {
                                    setSelected(options.find((doctor) => doctor.value === currentValue))
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        selected?.value === option.value ? "opacity-100" : "opacity-0"
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
