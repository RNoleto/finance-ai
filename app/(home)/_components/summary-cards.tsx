import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react";

const SummaryCards = () => {
    return ( 
        <div className="space-y-6">
            {/* PRIMEIRO CARD */}
            <Card>
                <CardHeader>
                    <WalletIcon size={16} />
                    <p className="text-white opacity-70">Saldo</p>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">R$2.700</p>
                </CardContent>
            </Card>

            {/* OUTROS CARDS */}
            <div className="grid grid-cols-3">
            <Card>
                <CardHeader className="flex-row items-center gap-2">
                    <PiggyBankIcon size={14} />
                    <p className="text-muted-foreground">Investido</p>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">R$3.500</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <TrendingUpIcon size={14} />
                    <p className="text-muted-foreground">Receita</p>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">R$3.500</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <TrendingDownIcon size={14} />
                    <p className="text-muted-foreground">Despesas</p>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">R$3.500</p>
                </CardContent>
            </Card>
            </div>
        </div>
     );
}
 
export default SummaryCards;