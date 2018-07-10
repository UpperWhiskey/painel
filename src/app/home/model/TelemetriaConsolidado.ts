import { TelemetriaConsolidadoServico } from "./TelemetriaConsolidadoServico";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";


export class TelemetriaConsolidada { 
    constructor(){

        this.eixoX = ['0', '1', '2', '3'];
       var teleServico = new TelemetriaConsolidadoServico();
       teleServico.label="";
       teleServico.data = [0, 0, 0, 0];

       var teleServico2 = new TelemetriaConsolidadoServico();
       teleServico2.label = "";
       teleServico2.data = [0, 0, 0, 0];

       this.dataServicos = [teleServico, teleServico2];
    
    }
    eixoX: string[];
    dataServicos:  TelemetriaConsolidadoServico[];
}
