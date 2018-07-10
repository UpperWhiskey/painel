import { Servico } from "./Servico"

export class Incidente {
    id: string;
    remedyNumber: string;
    descricao: string;
    status: string;
    startTime:  number;
    endTime: number;
    startDay: number;
    endDay: number;
    tratado: boolean;
    tipo: string;
    servico: Servico;
}