import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'linha1IncidentePipe',
})
export class Linha1IncidentePipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        var diff = (value.endTime === 0 ? new Date().getTime() : value.endTime) - value.startTime;
        var diffHoras = diff / 1000 / 60 / 60;
        var hora = Math.floor(diffHoras);
        var minutosTmp = diff - (hora * 60 * 60 * 1000);
        var minutos = Math.floor(minutosTmp / 1000 / 60);
        var dataInicial = new Date(value.startTime);
        var mes = dataInicial.getMonth() + 1;
        return value.remedyNumber + "   " +
          dataInicial.getDate() + "/" + mes + "/" + dataInicial.getFullYear() + " " +
          (dataInicial.getHours() < 10 ? ("0" + dataInicial.getHours()) : dataInicial.getHours()) + ":" +
          (dataInicial.getMinutes() < 10 ? ("0" + dataInicial.getMinutes()) : dataInicial.getMinutes()) +
          ' duração ' + (hora < 10 ? "0" + hora : hora) + ":" + (minutos < 10 ? "0" + minutos : minutos);

    }

}
