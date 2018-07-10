import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import * as moment from 'moment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'prn-refresh-timer',
  templateUrl: './pdm-refresh-timer.component.html',
  styles: [``]
})
export class PrnRefreshTimerComponent implements OnInit, OnDestroy {
  @Input() time: number;
  @Output() onTick: EventEmitter<number>;
  @Output() onComplete: EventEmitter<number>;

  private timeLeft: number;
  private autoRefresh: boolean;
  private timerSub: Subscription;
  private storageKey = 'PRN_REFRESH_TIMER';
  loop: boolean = true;
  constructor() {
    this.onTick = new EventEmitter<number>();
    this.onComplete = new EventEmitter<number>();
  }

  ngOnInit(): void {
    this.autoRefresh = (this.getPreferences().enabled === undefined) ? true : this.getPreferences().enabled;
    if (this.loop == true) {
      this.refresh();
      this.loop = false;
    }

    if (this.isEnabled()) {
      this.reset();
    }
  }

  ngOnDestroy(): void {
    this.stop();
  }

  toggleAutoRefresh(): void {
    this.autoRefresh = !this.autoRefresh;

    if (this.autoRefresh) {
      this.reset();
    } else {
      this.stop();
    }

    this.savePreferences();
  }

  formatedTimeLeft(): string {
    const timeLeft = moment.duration(this.timeLeft, 'seconds');
    const minutes = timeLeft.minutes();
    const seconds = timeLeft.seconds();

    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  isEnabled(): boolean {
    return this.autoRefresh === true;
  }

  start(): void {
    this.timerSub = Observable
      .timer(1000, 1000)
      .take(this.timeLeft)
      .map(() => --this.timeLeft)
      .subscribe({
        next: () => {
          this.onTick.emit(this.timeLeft);
        },
        complete: () => {
          this.onComplete.emit(this.timeLeft);
          this.reset();
        }
      });
  }

  refresh(): void {
    this.onComplete.emit(this.timeLeft);
    this.reset();
  }

  stop(): void {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }

  reset(): void {
    this.timeLeft = +this.time;
    this.stop();
    this.start();
  }

  private savePreferences(): void {
    const preferences = JSON.stringify({
      enabled: this.autoRefresh
    });
    localStorage.setItem(this.storageKey, preferences);
  }

  private getPreferences(): any {
    if (localStorage.getItem(this.storageKey)) {
      return JSON.parse(localStorage.getItem(this.storageKey));
    }
    return {};
  }

  private pad(value: number, length: number = 2): string {
    let formatedNumber = value + '';
    while (formatedNumber.length < length) {
      formatedNumber = '0' + formatedNumber;
    }
    return formatedNumber;
  }

}
