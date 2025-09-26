import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectTradeComponent } from './protect-trade.component';

describe('ProtectTradeComponent', () => {
  let component: ProtectTradeComponent;
  let fixture: ComponentFixture<ProtectTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectTradeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtectTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
