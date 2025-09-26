import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldersAuditComponent } from './holders-audit.component';

describe('HoldersAuditComponent', () => {
  let component: HoldersAuditComponent;
  let fixture: ComponentFixture<HoldersAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoldersAuditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoldersAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
