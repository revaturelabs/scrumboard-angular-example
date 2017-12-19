import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrumHomeComponent } from './scrum-home.component';

describe('ScrumHomeComponent', () => {
  let component: ScrumHomeComponent;
  let fixture: ComponentFixture<ScrumHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrumHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrumHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
