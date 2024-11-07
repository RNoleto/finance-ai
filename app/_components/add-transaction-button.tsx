"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { z } from "zod";
import { TransactionType } from "@prisma/client";

const formSchema = z.object({
    name: z.string().trim().min(1, {
        message: "O nome é obrigatório.",
    }),
    amount: z.string().trim().min(1, {
        message: "O valor é obrigatório.",
    }),
    type: z.nativeEnum(TransactionType)
})

const AddTransactionButton = () => {
    return (
        <Dialog>
        <DialogTrigger asChild>
        <Button className="rounded-full font-bold">
            Adicionar transação
            <ArrowDownUpIcon/>
        </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Adicionar transação</DialogTitle>
                <DialogDescription>
                    Insira as informações abaixo
                </DialogDescription>
            </DialogHeader>

            <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Adicionar</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
}

export default AddTransactionButton;