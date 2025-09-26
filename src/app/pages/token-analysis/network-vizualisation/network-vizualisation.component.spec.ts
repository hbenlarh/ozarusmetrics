import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkVizualisationComponent } from './network-vizualisation.component';

describe('NetworkVizualisationComponent', () => {
  let component: NetworkVizualisationComponent;
  let fixture: ComponentFixture<NetworkVizualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkVizualisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkVizualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
