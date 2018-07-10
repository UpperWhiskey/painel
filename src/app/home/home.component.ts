import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChartFigComponent } from '../shared/chart-fig/chart-fig.component';
import { MonitorHomeService } from "./services/monitor-home.service";
import { StatusServicoConsolidado } from "./model/StatusServicoConsolidado";
import { IncidenteConsolidado } from "./model/IncidenteConsolidado";
import { Incidente } from "./model/Incidente";
import { TelemetriaConsolidada } from './model/TelemetriaConsolidado';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  statusServicoConsolidado: StatusServicoConsolidado;
  incidentesConsolidados: IncidenteConsolidado;
  incidentes: Incidente[];
  telemetria: TelemetriaConsolidada = new TelemetriaConsolidada();
  lineChartData: Array<any> = this.telemetria.dataServicos;
  lineChartLabels: Array<any> = this.telemetria.eixoX;
  loop: number = 1;

  constructor(private monService: MonitorHomeService) {}
  ngOnInit() {
    this.refreshDash();
  }
  refreshDash() {
    this.monService.getStatusServicos()
      .subscribe(data => this.statusServicoConsolidado = data,
        error => alert(error)
      );
    this.monService.getIncidenteConsolidado()
      .subscribe(data => this.incidentesConsolidados = data,
        error => alert(error)
      );
    this.monService.getIncidentes()
      .subscribe(data => this.incidentes = data,
        error => alert(error)
      );
    this.monService.getTelemetria()
      .subscribe(data => this.refreshChart(data),
        error => alert(error),
    );

  }

  refreshChart(data) {
      this.telemetria = data;
      console.log(data);
      this.lineChartLabels = this.telemetria.eixoX;
      let myClonedArray = Object.assign([], this.telemetria.dataServicos);
      setTimeout(() => {
        this.lineChartData = myClonedArray;
      }, 50);
  }

  autoRefresh() {
    this.refreshDash();
  }

  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public lineChartColors:Array<any> = [
    { // Jenkins Sucesso
      backgroundColor: 'rgba(0,255,127, 0.5)',
      borderColor: 'rgba(0,128,0, 0.5)',
      pointBackgroundColor: 'rgba(0,128,0, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,128,0, 1)'
    },
    { // Jenkins Falha
      backgroundColor: 'rgba(255, 0, 0, 0.5)',
      borderColor: 'rgba(255, 0, 0, 0.5)',
      pointBackgroundColor: 'rgba(255, 0, 0, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 0, 0, 1)'
    }
  ];
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}


