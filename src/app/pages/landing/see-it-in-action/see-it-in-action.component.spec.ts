import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeItInActionComponent } from './see-it-in-action.component';

describe('SeeItInActionComponent', () => {
  let component: SeeItInActionComponent;
  let fixture: ComponentFixture<SeeItInActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeItInActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeItInActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
