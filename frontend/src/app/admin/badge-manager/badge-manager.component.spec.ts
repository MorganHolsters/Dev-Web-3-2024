import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeManagerComponent } from './badge-manager.component';

describe('BadgeManagerComponent', () => {
  let component: BadgeManagerComponent;
  let fixture: ComponentFixture<BadgeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
