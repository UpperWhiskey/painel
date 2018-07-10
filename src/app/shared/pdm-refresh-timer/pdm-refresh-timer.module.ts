import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrnRefreshTimerComponent } from './pdm-refresh-timer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PrnRefreshTimerComponent
  ],
  exports: [
    PrnRefreshTimerComponent
  ]
})
export class PrnRefreshTimerModule { }
