import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallFooterComponent } from './small-footer.component';

describe('SmallFooterComponent', () => {
  let component: SmallFooterComponent;
  let fixture: ComponentFixture<SmallFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
