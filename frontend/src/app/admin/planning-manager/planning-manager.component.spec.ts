import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningManagerComponent } from './planning-manager.component';

describe('PlanningManagerComponent', () => {
  let component: PlanningManagerComponent;
  let fixture: ComponentFixture<PlanningManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanningManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
