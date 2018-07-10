import { StatusServico } from "./StatusServico"

export class StatusServicoConsolidado {
    id: string;
    time: number;
    servicos: StatusServico[];
}