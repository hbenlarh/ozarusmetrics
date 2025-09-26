import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenScanRequest, TokenScanResponse } from './token-scan.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenScannerService {
  private readonly API_BASE_URL = 'https://env-0211641.jcloud-ver-jpe.ik-server.com';
  private readonly SCAN_ENDPOINT = '/scan_token';

  constructor(private http: HttpClient) {}

  /**
   * Scan a Solana token address and get comprehensive analysis
   * @param tokenAddress - The Solana token address to scan
   * @returns Observable with token analysis data
   */
  scanToken(tokenAddress: string): Observable<TokenScanResponse> {
    if (!tokenAddress || tokenAddress.trim() === '') {
      return throwError(() => new Error('Token address is required'));
    }

    const requestBody = JSON.stringify({ token_address: tokenAddress.trim() });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    console.log('Sending request to API:', {
      url: `${this.API_BASE_URL}${this.SCAN_ENDPOINT}`,
      requestBody: requestBody,
      headers: headers
    });

    return this.http.post<any>(
      `${this.API_BASE_URL}${this.SCAN_ENDPOINT}`,
      requestBody,
      { headers }
    ).pipe(
      map((response: any) => {
        console.log('API Response:', response);
        
        // Validate response structure
        if (!response) {
          throw new Error('Invalid response from server');
        }

        // Process the response data similar to your working implementation
        const processedData = {
          basic_info: {
            name: response.metadata?.name,
            symbol: response.metadata?.symbol,
            image: response.metadata?.image,
            contract: response.metadata?.contract,
            creator: {
              address: response.metadata?.creator?.address
            },
            description: response.metadata?.description,
            age: response.metadata?.age,
            socials: {
              website: response.metadata?.socials?.website,
              telegram: response.metadata?.socials?.telegram,
              twitter: response.metadata?.socials?.twitter
            }
          },
          market_data: {
            liquidity: response.market_data?.liquidity,
            liquidity_str: response.market_data?.liquidity_str,
            market_cap: response.market_data?.market_cap,
            market_cap_str: response.market_data?.market_cap_str,
            dex_url: response.market_data?.dex_url,
            mint_url: response.market_data?.mint_url
          },
          holders: {
            total: response.holders?.total_wallets,
            top_ten_per: response.holders?.top_ten_per,
            total_holders: response.holders?.total_holders,
            top_ten: response.holders?.top_ten || [],
            top_individual_per: response.holders?.top_individual_per,
            burn_percentage: response.holders?.burn_percentage,
            top_hundred_per: response.holders?.top_hundred_per
          },
          security: {
            mint_auth_disabled: response.security?.mint_auth_disabled,
            freeze_authority: response.security?.freeze_authority,
            risk_score: response.security?.risk_score,
            message: response.security?.message || []
          }
        };

        return { success: true, data: processedData };
      }),
      catchError(error => {
        console.error('Token scan error:', error);
        
        // Handle different types of errors
        if (error.status === 0) {
          return throwError(() => new Error('Network error: Unable to connect to the server'));
        } else if (error.status === 400) {
          return throwError(() => new Error('Invalid token address format'));
        } else if (error.status === 404) {
          return throwError(() => new Error('Token not found'));
        } else if (error.status >= 500) {
          return throwError(() => new Error('Server error: Please try again later'));
        } else {
          return throwError(() => new Error(`Request failed: ${error.message || 'Unknown error'}`));
        }
      })
    );
  }

  /**
   * Validate if the provided string looks like a Solana token address
   * @param address - The address to validate
   * @returns boolean indicating if the address format is valid
   */
  isValidSolanaAddress(address: string): boolean {
    if (!address || typeof address !== 'string') {
      return false;
    }

    // Basic Solana address validation (44 characters, base58 encoded)
    const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    return solanaAddressRegex.test(address.trim());
  }

  /**
   * Get the full API endpoint URL
   * @returns The complete API endpoint URL
   */
  getApiEndpoint(): string {
    return `${this.API_BASE_URL}${this.SCAN_ENDPOINT}`;
  }
}
