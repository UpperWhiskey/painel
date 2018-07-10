import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFigComponent } from './chart-fig.component';

describe('ChartFigComponent', () => {
  let component: ChartFigComponent;
  let fixture: ComponentFixture<ChartFigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartFigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartFigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
