import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatYouGetComponent } from './what-you-get.component';

describe('WhatYouGetComponent', () => {
  let component: WhatYouGetComponent;
  let fixture: ComponentFixture<WhatYouGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatYouGetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatYouGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
