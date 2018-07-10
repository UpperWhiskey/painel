import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fader',
  template: `
  
  <section  class="fader transition motion" [ngClass]="{'active': fader }">
    {{fader}} xxxxx
  </section>
  `,

  styles: [`
    .fader{
        position: fixed;
        width: 50%;
        height: 100%;
        background: green;
        color: #fff;
        opacity: 0;
        visibility: hidden;
        bottom: 0;
        font-size: 3em;
        padding-top: 4em;
        left: 0;
        transition: 1000ms ease;
    }
    .fader.active{
      opacity: 1;
      visibility: visible;
    }
  `]
})

export class FaderComponent implements OnInit {
    private _fader: boolean;
    constructor() {}
    ngOnInit() {
    }

    get fader(): boolean {
      return this._fader;
    }
    
    @Input()
    set fader(fader: boolean) {
      this._fader = fader;
    }
  }
