import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { notFoundComponent } from './404/notFound.component';
import { ServiceListComponent } from "./services/service-list.component";
import { NewServiceComponent } from "./services/new-service.component";
import { DefaultGuard } from './shared/auth/guards/default.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [DefaultGuard], data: { title: 'Services Monitor' } },
  { path: 'painel', component: HomeComponent, data: { title: 'Services Monitor' } },
  { path: 'services', component: ServiceListComponent, canActivate: [DefaultGuard], data: { title: 'Services Monitor - Lista de Serviços' }},
  { path: 'services/new', component: NewServiceComponent, canActivate: [DefaultGuard], data: { title: 'Services Monitor - Lista de Serviços' } },
  { path: 'acessonegado', component: notFoundComponent, data: { title: 'Services Monitor - 404' } },
  {path: '**', component: notFoundComponent, data: {title: 'Services Monitor - 404'}}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
