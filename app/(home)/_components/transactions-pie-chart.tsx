"use client"

import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
} from "@/app/_components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/app/_components/ui/chart"
import { TransactionType } from "@prisma/client"
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types"
import { TrendingUpIcon } from "lucide-react"

const chartConfig = {
    [TransactionType.INVESTMENT]: {
        label: "Investimento",
        color: "#FFFFFF",
    },
    [TransactionType.DEPOSIT]: {
        label: "Deposito",
        color: "#55B02E",
    },
    [TransactionType.EXPENSE]: {
        label: "Despesas",
        color: "#E93030",
    },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
    typesPercentage: TransactionPercentagePerType;
    depositsTotal: number;
    investmentsTotal: number;
    expensesTotal: number;
}

const TransactionPieChart = ({ depositsTotal, investmentsTotal, expensesTotal, typesPercentage }: TransactionsPieChartProps) => {
    const chartData = [
        {
            type: TransactionType.DEPOSIT,
            amount: depositsTotal,
            fill: "#55B02E",
        },
        {
            type: TransactionType.INVESTMENT,
            amount: investmentsTotal,
            fill: "#FFFFFF",
        },
        {
            type: TransactionType.EXPENSE,
            amount: expensesTotal,
            fill: "#E93030",
        },
    ]
    return (
        <Card className="flex flex-col p-12">
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="amount"
                            nameKey="type"
                            innerRadius={60}
                        />
                    </PieChart>
                </ChartContainer>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        {/* ICONE */}
                        <div className="flex items-center gap-2">
                            <TrendingUpIcon size={16} className="text-primary"/>
                            <p className="text-sm text-muted-foreground">Receita</p>
                        </div>
                        {/* Porcentagem */}
                        <p className="font-bold text-sm">{typesPercentage[TransactionType.DEPOSIT]}%</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default TransactionPieChart;
