import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenScannerService } from '../../services/token-scanner.service';
import { TokenScanResponse } from '../../services/token-scan.interface';
import { ApiDebugService } from '../../services/api-debug.service';
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
  debugInfo: string = '';
  
  search_path = 'assets/icon/search.png';
  card_gift_card_path = 'assets/icon/gift.png';
  play_card_path = 'assets/icon/play.png';
  kyc_path = 'assets/icon/person_kyc.png';
  dark_mode_path = 'assets/icon/dark_mode.png';
  gift_purple_path = 'assets/icon/gift_purple.png';

  constructor(
    private tokenScanner: TokenScannerService,
    private router: Router,
    private apiDebug: ApiDebugService,
    private tokenDataService: TokenDataService
  ) {
    console.log('Hero Component - TokenDataService injected:', this.tokenDataService);
  }

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
        console.log('Hero Component - Full API Response:', response);
        console.log('Hero Component - Response success:', response.success);
        console.log('Hero Component - Response data:', response.data);
        
        if (response.success) {
          console.log('Hero Component - API Response success, storing data:', response.data);
          console.log('Hero Component - TokenDataService available:', !!this.tokenDataService);
          
          // Store data in service
          this.tokenDataService.setTokenData(response.data);
          this.tokenDataService.setTokenAddress(this.tokenAddress.trim());
          
          console.log('Hero Component - Data stored, navigating to:', `/token-analysis/${this.tokenAddress.trim()}`);
          
          // Navigate to token analysis page with token address in URL
          this.router.navigate(['/token-analysis', this.tokenAddress.trim()]);
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

  toggleDarkMode() {
    // TODO: Implement dark mode toggle
    console.log('Dark mode toggle clicked');
  }

  clearError() {
    this.errorMessage = '';
  }

  // Debug methods
  testApiConnection() {
    this.debugInfo = 'Testing API connection with GET...';
    this.apiDebug.testApiConnection().subscribe({
      next: (response) => {
        this.debugInfo = `GET Test Success: ${JSON.stringify(response, null, 2)}`;
        console.log('GET Test Success:', response);
      },
      error: (error) => {
        this.debugInfo = `GET Test Error: ${JSON.stringify({
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        }, null, 2)}`;
        console.error('GET Test Error:', error);
      }
    });
  }

  testApiWithPost() {
    if (!this.tokenAddress.trim()) {
      this.debugInfo = 'Please enter a token address first';
      return;
    }

    this.debugInfo = 'Testing API with POST JSON...';
    this.apiDebug.testApiWithPost(this.tokenAddress.trim()).subscribe({
      next: (response) => {
        this.debugInfo = `POST JSON Test Success: ${JSON.stringify(response, null, 2)}`;
        console.log('POST JSON Test Success:', response);
      },
      error: (error) => {
        this.debugInfo = `POST JSON Test Error: ${JSON.stringify({
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        }, null, 2)}`;
        console.error('POST JSON Test Error:', error);
      }
    });
  }

  testApiWithUrlEncoded() {
    if (!this.tokenAddress.trim()) {
      this.debugInfo = 'Please enter a token address first';
      return;
    }

    this.debugInfo = 'Testing API with URL-encoded data...';
    this.apiDebug.testApiWithUrlEncoded(this.tokenAddress.trim()).subscribe({
      next: (response) => {
        this.debugInfo = `URL-Encoded Test Success: ${JSON.stringify(response, null, 2)}`;
        console.log('URL-Encoded Test Success:', response);
      },
      error: (error) => {
        this.debugInfo = `URL-Encoded Test Error: ${JSON.stringify({
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        }, null, 2)}`;
        console.error('URL-Encoded Test Error:', error);
      }
    });
  }

  testApiWithFormData() {
    if (!this.tokenAddress.trim()) {
      this.debugInfo = 'Please enter a token address first';
      return;
    }

    this.debugInfo = 'Testing API with FormData...';
    this.apiDebug.testApiWithFormData(this.tokenAddress.trim()).subscribe({
      next: (response) => {
        this.debugInfo = `FormData Test Success: ${JSON.stringify(response, null, 2)}`;
        console.log('FormData Test Success:', response);
      },
      error: (error) => {
        this.debugInfo = `FormData Test Error: ${JSON.stringify({
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        }, null, 2)}`;
        console.error('FormData Test Error:', error);
      }
    });
  }

  testApiWithPut() {
    if (!this.tokenAddress.trim()) {
      this.debugInfo = 'Please enter a token address first';
      return;
    }

    this.debugInfo = 'Testing API with PUT...';
    this.apiDebug.testApiWithPut(this.tokenAddress.trim()).subscribe({
      next: (response) => {
        this.debugInfo = `PUT Test Success: ${JSON.stringify(response, null, 2)}`;
        console.log('PUT Test Success:', response);
      },
      error: (error) => {
        this.debugInfo = `PUT Test Error: ${JSON.stringify({
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        }, null, 2)}`;
        console.error('PUT Test Error:', error);
      }
    });
  }
}
