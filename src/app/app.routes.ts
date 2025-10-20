import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { TokenAnalysisComponent } from './pages/token-analysis/token-analysis.component';
import { GlossaryComponent } from './pages/glossary/glossary.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { TokenomicsComponent } from './pages/tokenomics/tokenomics.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { HowItWorkComponent } from './pages/how-it-work/how-it-work.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'token-analysis/:tokenAddress', component: TokenAnalysisComponent },
  { path: 'token-analysis', component: TokenAnalysisComponent },
  { path: 'glossary', component: GlossaryComponent },
  { path: 'roadmap', component: RoadmapComponent },
  { path: 'tokenomics', component: TokenomicsComponent },
  { path: 'privacy-policy', component: PolicyComponent },
  { path: 'terms-conditions', component: TermsComponent },
  { path: 'how_it_work', component: HowItWorkComponent },
  { path: '**', redirectTo: '' }
];
