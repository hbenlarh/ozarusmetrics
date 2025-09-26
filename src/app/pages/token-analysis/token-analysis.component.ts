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
  ) {
    console.log('TokenAnalysis Component - TokenDataService injected:', this.tokenDataService);
  }

  ngOnInit() {
    // Get token address from route parameter
    this.route.params.subscribe(params => {
      this.tokenAddress = params['tokenAddress'] || '';
      console.log('Token Address from URL:', this.tokenAddress);
      this.loadTokenData();
    });

    // Subscribe to token data changes
    const tokenDataSubscription = this.tokenDataService.tokenData$.subscribe(data => {
      console.log('TokenAnalysis - Token data subscription received:', data);
      this.tokenData = data;
    });

    // Subscribe to token address changes
    const tokenAddressSubscription = this.tokenDataService.tokenAddress$.subscribe(address => {
      console.log('TokenAnalysis - Token address subscription received:', address);
      this.tokenAddress = address || this.tokenAddress;
    });

    this.subscriptions.push(tokenDataSubscription, tokenAddressSubscription);

    // Load initial data
    this.loadTokenData();
  }

  private loadTokenData() {
    // Get data from service
    console.log('TokenAnalysis - TokenDataService available:', !!this.tokenDataService);
    this.tokenData = this.tokenDataService.getTokenData();
    this.tokenAddress = this.tokenDataService.getTokenAddress() || this.tokenAddress;
    
    console.log('Token Analysis - Received data from service:', this.tokenData);
    console.log('Token Analysis - Token address from service:', this.tokenAddress);
    
    // If no data in service, try to get from router state (fallback)
    if (!this.tokenData) {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras?.state) {
        this.tokenData = navigation.extras.state['tokenData'];
        this.tokenAddress = navigation.extras.state['tokenAddress'] || this.tokenAddress;
        console.log('Token Analysis - Fallback from router state:', this.tokenData);
      }
    }
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
