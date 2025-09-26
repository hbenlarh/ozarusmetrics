import { HowWorksComponent } from './how-works/how-works.component';
import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { HeroComponent } from "../../layout/hero/hero.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { ListedTrackedComponent } from './listed-tracked/listed-tracked.component';
import { PoweredLeadersComponent } from './powered-leaders/powered-leaders.component';
import { WhatYouGetComponent } from './what-you-get/what-you-get.component';
import { TrustedByTradersComponent } from './trusted-by-traders/trusted-by-traders.component';
import { SeeItInActionComponent } from './see-it-in-action/see-it-in-action.component';
import { ProtectTradeComponent } from './protect-trade/protect-trade.component';
import { AsSeenInComponent } from './as-seen-in/as-seen-in.component';

@Component({
  selector: 'app-landing',
  imports: [HeaderComponent, HeroComponent, ListedTrackedComponent, PoweredLeadersComponent, HowWorksComponent, WhatYouGetComponent,
    TrustedByTradersComponent, SeeItInActionComponent, ProtectTradeComponent, AsSeenInComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
