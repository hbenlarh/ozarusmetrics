import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenScannerService } from '../../services/token-scanner.service';
import { TokenScanResponse } from '../../services/token-scan.interface';
import { TokenDataService } from '../../services/token-data.service';

@Component({
  selector: 'app-hero',
  imports: [FormsModule, CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  tokenAddress: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  
  search_path = 'assets/icon/search.png';
  card_gift_card_path = 'assets/icon/gift.png';
  play_card_path = 'assets/icon/play.png';
  kyc_path = 'assets/icon/person_kyc.png';
  dark_mode_path = 'assets/icon/dark_mode.png';
  gift_purple_path = 'assets/icon/gift_purple.png';

  constructor(
    private tokenScanner: TokenScannerService,
    private router: Router,
    private tokenDataService: TokenDataService
  ) {}

  scanNow() {
    if (!this.tokenAddress.trim()) {
      this.errorMessage = 'Please enter a token address';
      return;
    }

    if (!this.tokenScanner.isValidSolanaAddress(this.tokenAddress)) {
      this.errorMessage = 'Please enter a valid Solana token address';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.tokenScanner.scanToken(this.tokenAddress.trim()).subscribe({
      next: (response: TokenScanResponse) => {
        this.isLoading = false;
        
        if (response.success) {
          // Store data in service
          this.tokenDataService.setTokenData(response.data);
          this.tokenDataService.setTokenAddress(this.tokenAddress.trim());
          
          // Navigate to token analysis page with token address in URL
          this.router.navigate(['/token-analysis', this.tokenAddress.trim()]);
        } else {
          const errorMsg = response.error || response.message || 'Token scan failed';
          this.errorMessage = `API Error: ${errorMsg}`;
        }
      },
      error: (error) => {
        this.isLoading = false;
        
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

  toggleDarkMode() {
    // TODO: Implement dark mode toggle
  }

  clearError() {
    this.errorMessage = '';
  }

}
