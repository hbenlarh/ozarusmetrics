import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsSeenInComponent } from './as-seen-in.component';

describe('AsSeenInComponent', () => {
  let component: AsSeenInComponent;
  let fixture: ComponentFixture<AsSeenInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsSeenInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsSeenInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
