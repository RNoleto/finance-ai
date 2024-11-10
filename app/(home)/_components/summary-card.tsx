import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { PiggyBankIcon } from "lucide-react";

const SummaryCard = () => {
    return ( 
        <Card>
                <CardHeader className="flex-row items-center gap-2">
                    <PiggyBankIcon size={14} />
                    <p className="text-muted-foreground">Investido</p>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">R$3.500</p>
                </CardContent>
            </Card>
     );
}
 
export default SummaryCard;