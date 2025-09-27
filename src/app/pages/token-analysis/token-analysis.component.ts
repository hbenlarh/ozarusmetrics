import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchHeaderComponent } from "../../layout/search-header/search-header.component";
import { TokenOverviewComponent } from './token-overview/token-overview.component';
import { HoldersAuditComponent } from "./holders-audit/holders-audit.component";
import { NetworkVizualisationComponent } from "./network-vizualisation/network-vizualisation.component";
import { SmallFooterComponent } from "../../layout/small-footer/small-footer.component";
import { TokenScanResponse } from '../../services/token-scan.interface';
import { TokenDataService } from '../../services/token-data.service';

@Component({
  selector: 'app-token-analysis',
  imports: [SearchHeaderComponent, TokenOverviewComponent, HoldersAuditComponent, NetworkVizualisationComponent, SmallFooterComponent],
  templateUrl: './token-analysis.component.html',
  styleUrl: './token-analysis.component.scss'
})
export class TokenAnalysisComponent implements OnInit, OnDestroy {
  tokenData: any = null;
  tokenAddress: string = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tokenDataService: TokenDataService
  ) {}

  ngOnInit() {
    // Get token address from route parameter
    this.route.params.subscribe(params => {
      this.tokenAddress = params['tokenAddress'] || '';
      this.loadTokenData();
    });

    // Subscribe to token data changes
    const tokenDataSubscription = this.tokenDataService.tokenData$.subscribe(data => {
      this.tokenData = data;
    });

    // Subscribe to token address changes
    const tokenAddressSubscription = this.tokenDataService.tokenAddress$.subscribe(address => {
      this.tokenAddress = address || this.tokenAddress;
    });

    this.subscriptions.push(tokenDataSubscription, tokenAddressSubscription);

    // Load initial data
    this.loadTokenData();
  }

  private loadTokenData() {
    // Get data from service
    this.tokenData = this.tokenDataService.getTokenData();
    this.tokenAddress = this.tokenDataService.getTokenAddress() || this.tokenAddress;
    
    
    // If no data in service, try to get from router state (fallback)
    if (!this.tokenData) {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras?.state) {
        this.tokenData = navigation.extras.state['tokenData'];
        this.tokenAddress = navigation.extras.state['tokenAddress'] || this.tokenAddress;
      }
    }
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
