import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-notFound',
  template: `
  <div class="content">
    <div class="block-title lined wrapper-application">    
      <div class="container">
        <h1 class="title">404</h1>
        <!-- h2 class="subtitle">Busque uma aplicação para consultar a análise de risco</h2 -->
         <h2 class="subtitle">Esta página não existe</h2 >
      </div>
    </div>
  </div>
  `,

  styles: [`
    
  `]
})
export class notFoundComponent {
  
  constructor() { }

  ngOnInit() {
  }

}
