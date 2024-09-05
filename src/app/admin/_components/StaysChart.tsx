"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/_components/ui/chart"
import { Stay } from "@prisma/client"

const chartConfig = {
    stays: {
        label: "Séjours",
        color: "hsl(221.2 83.2% 53.3%)",
    },
} satisfies ChartConfig

export function filterStaysPerMonth(stays: Stay[]) {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const past12Months = Array.from({ length: 12 }, (_, index) => {
        const month = currentMonth - index;
        return { month: new Date(currentYear, month, 0).toLocaleString('fr-FR', { month: 'long', year: 'numeric' }), stays: 0 };
    });

    stays.forEach(stay => {
        const stayMonth = new Date(stay.start).getMonth() + 1;

        const stayYear = new Date(stay.start).getFullYear();
        const index = past12Months.findIndex(month => month.month === new Date(stayYear, stayMonth, 0).toLocaleString('fr-FR', { month: 'long', year: 'numeric' }));
        if (index !== -1) {
            past12Months[index].stays++;
        }
    });

    return past12Months.reverse()
}

export function StaysChart({ stays }: { stays: Stay[] }) {
    const chartData = filterStaysPerMonth(stays)    

    return (
        <ChartContainer config={chartConfig} className="h-[100%] w-[56%] ">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="stays" fill="var(--color-stays)" radius={8} />
            </BarChart>
        </ChartContainer>
    )
}
