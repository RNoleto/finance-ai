import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

const TransactionsPage = async () => {
    const {userId} = await auth()
    if(!userId){
        redirect('/login');
    }
    // acessar as transações do banco de dados
    const transactions = await db.transaction.findMany({
        where: {
            userId,
        },
        orderBy: {
            date: "desc",
        }
    });
    const userCanAddTransaction = await canUserAddTransaction()
    return (
        <>
        <Navbar />
        <div className="flex flex-col space-y-6 overflow-hidden p-6">
            {/* Titulo e botão */}
            <div className="flex w-full justify-between items-center">
                <h1 className="text-2xl font-bold">Transações</h1>
                <AddTransactionButton userCanAddTransaction={userCanAddTransaction}/>
            </div>
            <ScrollArea>
                <DataTable columns={transactionColumns} data={JSON.parse(JSON.stringify(transactions))}/>
            </ScrollArea>            
        </div>
        </>
    )
};

export default TransactionsPage;