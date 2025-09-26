import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenAnalysisComponent } from './token-analysis.component';

describe('TokenAnalysisComponent', () => {
  let component: TokenAnalysisComponent;
  let fixture: ComponentFixture<TokenAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
