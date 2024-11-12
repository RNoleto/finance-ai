import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";

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
    const totalExpensePerCategory: TotalExpensePerCategory[] = (
        await db.transaction.groupBy({
          by: ["category"],
          where: {
            ...where,
            type: TransactionType.EXPENSE,
          },
          _sum: {
            amount: true,
          },
        })
      ).map((category) => ({
        category: category.category,
        totalAmount: Number(category._sum.amount),
        percentageOfTotal: Math.round(
          (Number(category._sum.amount) / Number(expensesTotal)) * 100,
        ),
      }));

      const lastTransactions = await db.transaction.findMany({
        where,
        orderBy: { date: "desc"},
        take: 10,
      });

    return {
        balance,
        depositsTotal,
        investmentsTotal,
        expensesTotal,
        typesPercentage,
        totalExpensePerCategory,
        lastTransactions,
    };
};
