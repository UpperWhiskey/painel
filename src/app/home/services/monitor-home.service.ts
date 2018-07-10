import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment.prod';
import { StatusServicoConsolidado } from "./../model/StatusServicoConsolidado";
import { StatusServico } from "./../model/StatusServico";
import { Incidente } from "./../model/Incidente";
import { IncidenteConsolidado } from "./../model/IncidenteConsolidado";
import { Observable, Subject, pipe } from 'rxjs';
import { TelemetriaConsolidada } from '../model/TelemetriaConsolidado';


@Injectable()

export class MonitorHomeService {

    private URL_HOME_GET_TELEMETRIA_CONSOLIDADO: string;
    private URL_HOME_GET_STATUS_SERVICO: string;
    private URL_HOME_GET_INCIDENTECONSOLIDADO: string;
    private URL_HOME_GET_INCIDENTES: string;
   

    constructor(private http: HttpClient) {
        this.URL_HOME_GET_TELEMETRIA_CONSOLIDADO = `${environment.URL_HOME_GET_TELEMETRIA_CONSOLIDADO}`;
        this.URL_HOME_GET_STATUS_SERVICO = `${environment.URL_HOME_GET_STATUS_SERVICO}`;
        this.URL_HOME_GET_INCIDENTECONSOLIDADO = `${environment.URL_HOME_GET_INCIDENTECONSOLIDADO}`;
        this.URL_HOME_GET_INCIDENTES = `${environment.URL_HOME_GET_INCIDENTES}`;
    }

    getStatusServicos(): Observable<StatusServicoConsolidado> {
        return this.http
          .get<StatusServicoConsolidado>(this.URL_HOME_GET_STATUS_SERVICO)
          .pipe(map(data => data));
  }

    getIncidenteConsolidado(): Observable<IncidenteConsolidado> {

        return this.http
            .get<StatusServico>(this.URL_HOME_GET_INCIDENTECONSOLIDADO)
            .pipe(map(data => data));
    }

    getIncidentes(): Observable<Incidente[]> {

        var date = new Date();

        var dateMilli = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0);

        return this.http
            .get<Incidente[]>(this.URL_HOME_GET_INCIDENTES + '/' + dateMilli)
            .pipe(map(data => data));
    }

    getTelemetria(): Observable<TelemetriaConsolidada> {

        var date = new Date();
        var dateNow = date.getTime();
        var dateMilliStart = dateNow - (1000 * 60 * 90);
    
        return this.http
            .get<TelemetriaConsolidada>(this.URL_HOME_GET_TELEMETRIA_CONSOLIDADO + dateMilliStart + '/' + dateNow)
            .pipe(map(data => data));
    }

}
