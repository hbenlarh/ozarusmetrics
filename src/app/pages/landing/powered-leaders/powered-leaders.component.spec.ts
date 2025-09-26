import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoweredLeadersComponent } from './powered-leaders.component';

describe('PoweredLeadersComponent', () => {
  let component: PoweredLeadersComponent;
  let fixture: ComponentFixture<PoweredLeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoweredLeadersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoweredLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
