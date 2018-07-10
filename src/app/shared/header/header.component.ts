import { Component, OnInit } from '@angular/core';
import { LogoSantanderComponent } from "../logo-santander/logo-santander.component";

@Component({
  selector: 'app-header',
  template: `
    <header class="wrapper-header">
      <div class="main-header"> 
        <div class="container">
          <div class="wrapper-content">
            <div class="nav-actions"> 
              <button class="nav-btn" (click)="toggleNav()" role="button" type="button"> </button>
              <div class="brand" [routerLink]="['']">
                <app-logo-santander class="brand-santander" [color]="logoColor"></app-logo-santander>
              </div>
            </div>

            <div class="extra-actions"> 
              <div class="options">
                <div class="item app_name">
                  <h1 class="title">Painel de Monitoração de Serviços</h1> 
                </div>
              </div>
            </div>
          </div>        
        </div>
      </div>
      <nav role="nav" class="main-nav" [ngClass]="{ 'active': navStatus } ">
        <ul>
          <li><a routerLink="" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="toggleNav('F')"  aria-label="dashboaard page "><span class="icon home "></span><span class="title">Home</span></a></li>
          <li><a routerLink="services" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="toggleNav('F')" aria-label="services page"><span class="icon admin"></span><span class="title">Admin</span></a></li>
        </ul>
    </nav>
  </header>
  `,
  styles: [`
  :host{
    display: block;
    position: relative;
  }
    `]
})
export class HeaderComponent implements OnInit {
  logoColor: string;
  navStatus : boolean;

  constructor() {
    this.logoColor = "#f00"; 
    this.navStatus = false;
  }

  ngOnInit() {
  }

  toggleNav(status = null){
    if (status === "F") {
      this.navStatus = false; return;
    }
    this.navStatus = !this.navStatus;
  }

}
