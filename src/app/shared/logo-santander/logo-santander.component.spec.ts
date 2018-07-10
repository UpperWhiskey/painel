import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoSantanderComponent } from './logo-santander.component';

describe('LogoSantanderComponent', () => {
  let component: LogoSantanderComponent;
  let fixture: ComponentFixture<LogoSantanderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoSantanderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoSantanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
