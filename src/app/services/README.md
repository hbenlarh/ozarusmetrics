# Token Scanner Service

This service provides functionality to scan Solana tokens using the external API endpoint.

## Usage

### Basic Usage

```typescript
import { TokenScannerService } from './services/token-scanner.service';

constructor(private tokenScanner: TokenScannerService) {}

// Scan a token
this.tokenScanner.scanToken('So11111111111111111111111111111111111111112')
  .subscribe({
    next: (response) => {
      if (response.success) {
        console.log('Token data:', response.data);
      } else {
        console.error('Scan failed:', response.error);
      }
    },
    error: (error) => {
      console.error('Request failed:', error.message);
    }
  });
```

### Validation

```typescript
// Check if address is valid before scanning
if (this.tokenScanner.isValidSolanaAddress(tokenAddress)) {
  this.tokenScanner.scanToken(tokenAddress).subscribe(/* ... */);
} else {
  console.error('Invalid Solana address format');
}
```

## API Request Structure

The service sends a POST request to the API with the following structure:

```typescript
{
  "token_address": "So11111111111111111111111111111111111111112"
}
```

## API Response Structure

The service returns a `TokenScanResponse` object with the following structure:

```typescript
interface TokenScanResponse {
  success: boolean;
  data?: {
    tokenAddress: string;
    tokenName?: string;
    tokenSymbol?: string;
    reliabilityScore?: number;
    holderDistribution?: {
      top10: number;
      top50: number;
      others: number;
    };
    liquidity?: {
      totalLiquidity: number;
      lpLockStatus: 'locked' | 'unlocked';
      lockDuration?: number;
    };
    supplyAnalysis?: {
      totalSupply: number;
      circulatingSupply: number;
      mintAuthority: boolean;
      freezeAuthority: boolean;
    };
    metadata?: {
      name: string;
      symbol: string;
      description?: string;
      image?: string;
    };
  };
  error?: string;
  message?: string;
}
```

## Error Handling

The service includes comprehensive error handling for:

- Network errors (connection issues)
- Invalid token addresses (400 status)
- Token not found (404 status)
- Server errors (500+ status)
- Invalid response format

## Configuration

The API endpoint is configured in the service:
- Base URL: `https://env-0211641.jcloud-ver-jpe.ik-server.com`
- Endpoint: `/scan_token`

## Dependencies

- `@angular/common/http` - HttpClient for API calls
- `rxjs` - Observable handling
