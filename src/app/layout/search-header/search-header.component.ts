import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TokenScannerService } from '../../services/token-scanner.service';
import { TokenScanResponse } from '../../services/token-scan.interface';
import { TokenDataService } from '../../services/token-data.service';

@Component({
  selector: 'app-search-header',
  imports: [FormsModule, CommonModule],
  templateUrl: './search-header.component.html',
  styleUrl: './search-header.component.scss'
})
export class SearchHeaderComponent {
  contractAddress = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  logo = "assets/icon/logo.svg";

  constructor(
    private tokenScanner: TokenScannerService,
    private router: Router,
    private tokenDataService: TokenDataService
  ) {
    console.log('SearchHeader Component - TokenDataService injected:', this.tokenDataService);
  }

  onScan() {
    if (!this.contractAddress.trim()) {
      this.errorMessage = 'Please enter a token address';
      return;
    }

    if (!this.tokenScanner.isValidSolanaAddress(this.contractAddress)) {
      this.errorMessage = 'Please enter a valid Solana token address';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.tokenScanner.scanToken(this.contractAddress.trim()).subscribe({
      next: (response: TokenScanResponse) => {
        this.isLoading = false;
        console.log('SearchHeader - Full API Response:', response);
        console.log('SearchHeader - Response success:', response.success);
        console.log('SearchHeader - Response data:', response.data);

        if (response.success) {
          console.log('SearchHeader - API Response success, storing data:', response.data);
          console.log('SearchHeader - TokenDataService available:', !!this.tokenDataService);

          // Store data in service
          this.tokenDataService.setTokenData(response.data);
          this.tokenDataService.setTokenAddress(this.contractAddress.trim());

          console.log('SearchHeader - Data stored, navigating to:', `/token-analysis/${this.contractAddress.trim()}`);
          console.log('SearchHeader - Verifying data after storage:', {
            tokenData: this.tokenDataService.getTokenData(),
            tokenAddress: this.tokenDataService.getTokenAddress()
          });

          // Small delay to ensure data is properly set
          setTimeout(() => {
            // Navigate to token analysis page with token address in URL
            this.router.navigate(['/token-analysis', this.contractAddress.trim()]);
          }, 100);
        } else {
          const errorMsg = response.error || response.message || 'Token scan failed';
          console.error('API returned error:', response);
          this.errorMessage = `API Error: ${errorMsg}`;
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('HTTP Error Details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        });

        let errorMessage = 'An error occurred while scanning the token';

        if (error.status === 0) {
          errorMessage = 'Network error: Unable to connect to the server. Please check your internet connection.';
        } else if (error.status === 400) {
          errorMessage = 'Invalid request: Please check the token address format.';
        } else if (error.status === 404) {
          errorMessage = 'Token not found: The provided address may not exist.';
        } else if (error.status >= 500) {
          errorMessage = 'Server error: Please try again later.';
        } else if (error.error && error.error.message) {
          errorMessage = `Server error: ${error.error.message}`;
        } else if (error.message) {
          errorMessage = error.message;
        }

        this.errorMessage = errorMessage;
      }
    });
  }

  clearError() {
    this.errorMessage = '';
  }
}
