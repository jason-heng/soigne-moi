"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/_components/ui/card"
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

export function StaysChart({ stays }: { stays: Stay[] }) {
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

    const chartData = past12Months.reverse().map(month => ({
        month: month.month,
        stays: month.stays,
    }));

    return (
        <ChartContainer config={chartConfig} className="h-[100%] w-[65%] ">
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                    dataKey="stays"
                    type="natural"
                    fill="var(--color-stays)"
                    fillOpacity={0.4}
                    stroke="var(--color-stays)"
                    stackId="a"
                />
            </AreaChart>
        </ChartContainer>
    )
}
