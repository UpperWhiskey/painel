import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StatusServico } from "./../model/StatusServico";


@Pipe({
    name: 'ordemServicosPipe'
})
export class OrdemServicosPipe implements PipeTransform {
    transform(statusServico: StatusServico[]) {
        statusServico.sort((a: any, b: any) => {
            return this.compare(a, b);
        });
        return statusServico;



        //statusServico.sort((a: any, b: any) => {
        //    if (a['status'] < b['status']) {
        //        return -1;
        //    } else if (a['status'] > b['status']) {
        //        return 1;
        //    } else {
        //        return 0;
        //    }
        //});

        //for (var a = 0; a < statusServico.length; a++) {
        //    switch (statusServico[a].status) {
        //        case 'Disponível':
        //            statusServico[a].ordem = 3;
        //            break;
        //        case 'Atenção':
        //            statusServico[a].ordem = 2;
        //            break;
        //        case 'Crítico':
        //            statusServico[a].ordem = 1;
        //            break;
        //    }
            
        //}

        //return statusServico.filter(item => item.servico).reverse();
    }

    private compare(a: any, b: any) {
        if (a.status === b.status) {
            return 0;
        }
        else if (a.status === "Crítico") {
            return -1;
        }
        else if (b.status === "Crítico") {
            return 1;
        }
        else if (a.status === "Disponível") {
            return 1;
        }
        else if (b.status === "Disponível") {
            return -1;
        }
        else {
            return 1;
        }

    }



}
