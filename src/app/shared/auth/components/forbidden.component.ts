import { Component } from '@angular/core';

@Component({
  template: `
    <div class="auth-error-message">
      <h1>Acesso negado.</h1>
      <p><a routerLink="/">Clique aqui</a> para voltar pra página inicial.</p>
    </div>`,
  styles: [
    '.auth-error-message { padding: 50px; text-align: center }',
    '.auth-error-message h1 { font-size: 18px; font-weight: normal; }'
  ]
})
export class ForbiddenComponent { }
