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
import { TokenScannerService } from '../../services/token-scanner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-token-analysis',
  imports: [SearchHeaderComponent, TokenOverviewComponent, HoldersAuditComponent, NetworkVizualisationComponent, SmallFooterComponent, CommonModule],
  templateUrl: './token-analysis.component.html',
  styleUrl: './token-analysis.component.scss'
})
export class TokenAnalysisComponent implements OnInit, OnDestroy {
  tokenData: any = null;
  tokenAddress: string = '';
  isLoading: boolean = false;
  error: string | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tokenDataService: TokenDataService,
    private tokenScannerService: TokenScannerService
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
  }

  private loadTokenData() {
    // Reset states
    this.isLoading = false;
    this.error = null;
    
    // First try to get data from service (if user navigated from scan)
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

    // If still no data and we have a token address, fetch from API
    if (!this.tokenData && this.tokenAddress) {
      this.fetchTokenDataFromAPI();
    }
  }

  fetchTokenDataFromAPI() {
    if (!this.tokenAddress) {
      this.error = 'No token address provided';
      return;
    }

    this.isLoading = true;
    this.error = null;

    const scanSubscription = this.tokenScannerService.scanToken(this.tokenAddress).subscribe({
      next: (response: TokenScanResponse) => {
        if (response.success && response.data) {
          this.tokenData = response.data;
          // Store in service for consistency
          this.tokenDataService.setTokenData(response.data);
          this.tokenDataService.setTokenAddress(this.tokenAddress);
        } else {
          this.error = 'Failed to fetch token data';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching token data:', error);
        this.error = error.message || 'Failed to fetch token data';
        this.isLoading = false;
      }
    });

    this.subscriptions.push(scanSubscription);
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}