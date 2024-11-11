import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "./types";

export const getDashboad = async (month: string) => {
    const where = {
        date: {
            gte: new Date(`2024-${month}-01`),
            lt: new Date(`2024-${month}-31`),
        },
    };

    const depositsTotal = Number(
        (
            await db.transaction.aggregate({
                where: { ...where, type: "DEPOSIT" },
                _sum: { amount: true },
            })
        )?._sum?.amount || 0
    );

    const investmentsTotal = Number(
        (
            await db.transaction.aggregate({
                where: { ...where, type: "INVESTMENT" },
                _sum: { amount: true },
            })
        )?._sum?.amount || 0
    );

    const expensesTotal = Number(
        (
            await db.transaction.aggregate({
                where: { ...where, type: "EXPENSE" },
                _sum: { amount: true },
            })
        )?._sum?.amount || 0
    );

    const balance = depositsTotal - investmentsTotal - expensesTotal;

    const transactionsTotal = Number(
        (
            await db.transaction.aggregate({
                where,
                _sum: { amount: true },
            })
        )?._sum?.amount || 0
    );

    const typesPercentage: TransactionPercentagePerType = {
        [TransactionType.DEPOSIT]: transactionsTotal
            ? Math.round((depositsTotal / transactionsTotal) * 100)
            : 0,
        [TransactionType.EXPENSE]: transactionsTotal
            ? Math.round((expensesTotal / transactionsTotal) * 100)
            : 0,
        [TransactionType.INVESTMENT]: transactionsTotal
            ? Math.round((investmentsTotal / transactionsTotal) * 100)
            : 0,
    };

    return {
        balance,
        depositsTotal,
        investmentsTotal,
        expensesTotal,
        typesPercentage,
    };
};
