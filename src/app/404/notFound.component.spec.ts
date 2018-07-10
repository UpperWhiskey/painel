import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { notFoundComponent } from './404.component';

describe('notFoundComponent', () => {
  let component: notFoundComponent;
  let fixture: ComponentFixture<notFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ notFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(notFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
