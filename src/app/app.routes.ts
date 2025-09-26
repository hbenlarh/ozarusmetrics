import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { TokenAnalysisComponent } from './pages/token-analysis/token-analysis.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'token-analysis/:tokenAddress', component: TokenAnalysisComponent },
  { path: 'token-analysis', component: TokenAnalysisComponent },
  { path: '**', redirectTo: '' }
];
