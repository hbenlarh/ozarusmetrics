import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedTrackedComponent } from './listed-tracked.component';

describe('ListedTrackedComponent', () => {
  let component: ListedTrackedComponent;
  let fixture: ComponentFixture<ListedTrackedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListedTrackedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListedTrackedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
