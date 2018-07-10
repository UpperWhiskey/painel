import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart-fig',
  template: `
  <svg #chart [ngStyle]="{'fill': 'url(#' + myId + ')'}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="840.151 531.612 146.709 52.396"><defs> <linearGradient attr.id="{{myId}}" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" attr.stop-color="{{colorTop}}"/> <stop offset="1" attr.stop-color="{{colorBottom}}" stop-opacity="0.502"/></linearGradient></defs><g transform="translate(840.151 531.612)"> <path  [ngStyle]="{'fill': 'url(#' + myId + ')'}" d="M0,0H10.479V39.3H0Z" transform="translate(32.748 13.099)"/><path  [ngStyle]="{'fill': 'url(#' + myId + ')'}" d="M0,0H10.479V52.4H0Z" transform="translate(44.537 0)"/> <path  [ngStyle]="{'fill': 'url(#' + myId + ')'}" d="M0,0H10.479V26.2H0Z" transform="translate(115.272 26.198)"/><path  [ngStyle]="{'fill': 'url(#' + myId + ')'}" d="M0,0H10.479V26.2H0Z" transform="translate(0 26.198)"/> <path  [ngStyle]="{'fill': 'url(#' + myId + ')'}" d="M0,0H10.479V39.3H0Z" transform="translate(127.061 13.099)"/><path  [ngStyle]="{'fill': 'url(#' + myId + ')'}" d="M0,0H10.479V39.3H0Z" transform="translate(11.789 13.099)"/> <path  [ngStyle]="{'fill': 'url(#' + myId + ')'}" d="M0,0H7.859V23.578H0Z" transform="translate(138.85 28.818)"/><path  [ngStyle]="{'fill': 'url(#' + myId + ')'}" d="M0,0H7.859V23.578H0Z" transform="translate(23.578 28.818)"/> <path  [ngStyle]="{'fill': 'url(#' + myId + ')'}" d="M0,0H10.479V26.2H0Z" transform="translate(56.326 26.198)"/><path  [ngStyle]="{'fill': 'url(#' + myId + ')'}" d="M0,0H10.479V32.748H0Z" transform="translate(68.115 19.649)"/> <path  [ngStyle]="{'fill': 'url(#' + myId + ')'}" d="M0,0H10.479V45.847H0Z" transform="translate(79.904 6.55)"/><path  [ngStyle]="{'fill': 'url(#' + myId + ')'}" d="M0,0H10.479V32.748H0Z" transform="translate(91.693 19.649)"/> <path  [ngStyle]="{'fill': 'url(#' + myId + ')'}" d="M0,0H10.479V17.029H0Z" transform="translate(103.483 35.367)"/></g></svg>
  `,
  styles: [` 
    svg{ display: block; }
  `]
})

export class ChartFigComponent  {
  @Input() colorTop: string = "blue";
  @Input() colorBottom: string = "black";
  myId: string;
  
  constructor() {
    this.myId = this.makeid();
  }

  makeid() {
    var id = "";
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    return id;
  }
}
