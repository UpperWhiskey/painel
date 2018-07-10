import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { notFoundComponent } from './404/notFound.component';
import { FaderComponent } from './shared/ui/fader.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LogoSantanderComponent } from './shared/logo-santander/logo-santander.component';
import { ChartFigComponent } from './shared/chart-fig/chart-fig.component';
import { MonitorHomeService } from './home/services/monitor-home.service';
import { Linha1IncidentePipe } from "./home/pipes/Linha1IncidentePipe";
import { OrdemServicosPipe } from "./home/pipes/ordem-servicos.pipe";
import { PrnRefreshTimerModule } from './shared/pdm-refresh-timer/pdm-refresh-timer.module';
import { ServicesModule } from './services/module/services.module';
import { AutoScrollDirective } from './shared/directive/autoScroll.directive';
import { ChartsModule } from 'ng2-charts';
import { AuthModule } from './shared/auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    FaderComponent,
    HeaderComponent,
    FooterComponent,
    AutoScrollDirective,
    LogoSantanderComponent,
    notFoundComponent,
    HomeComponent,
    Linha1IncidentePipe,
    OrdemServicosPipe,
    ChartFigComponent,
  ],
  exports:[
    PrnRefreshTimerModule,
    ServicesModule
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    PrnRefreshTimerModule,
    ChartsModule,
    ServicesModule,
    AuthModule.forRoot({
      spaName: '',
      authProxyUrl: ''
    })

  ],
  providers: [MonitorHomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
