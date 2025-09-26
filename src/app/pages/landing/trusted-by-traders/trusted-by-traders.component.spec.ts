import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedByTradersComponent } from './trusted-by-traders.component';

describe('TrustedByTradersComponent', () => {
  let component: TrustedByTradersComponent;
  let fixture: ComponentFixture<TrustedByTradersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustedByTradersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrustedByTradersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
