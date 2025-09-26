import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenScannerService } from './token-scanner.service';
import { TokenScanResponse } from './token-scan.interface';

describe('TokenScannerService', () => {
  let service: TokenScannerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TokenScannerService]
    });
    service = TestBed.inject(TokenScannerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate Solana addresses correctly', () => {
    // Valid Solana addresses
    expect(service.isValidSolanaAddress('So11111111111111111111111111111111111111112')).toBe(true);
    expect(service.isValidSolanaAddress('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')).toBe(true);
    
    // Invalid addresses
    expect(service.isValidSolanaAddress('')).toBe(false);
    expect(service.isValidSolanaAddress('invalid')).toBe(false);
    expect(service.isValidSolanaAddress('123')).toBe(false);
  });

  it('should make HTTP request to scan token', () => {
    const mockResponse: TokenScanResponse = {
      success: true,
      data: {
        tokenAddress: 'So11111111111111111111111111111111111111112',
        tokenName: 'Wrapped SOL',
        tokenSymbol: 'WSOL',
        reliabilityScore: 95
      }
    };

    const tokenAddress = 'So11111111111111111111111111111111111111112';

    service.scanToken(tokenAddress).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://env-0211641.jcloud-ver-jpe.ik-server.com/scan_token');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ token_address: tokenAddress });
    req.flush(mockResponse);
  });

  it('should handle API errors', () => {
    const tokenAddress = 'invalid-address';

    service.scanToken(tokenAddress).subscribe({
      next: () => fail('Should have failed'),
      error: (error) => {
        expect(error.message).toContain('Invalid token address format');
      }
    });

    const req = httpMock.expectOne('https://env-0211641.jcloud-ver-jpe.ik-server.com/scan_token');
    req.flush({ error: 'Invalid address' }, { status: 400, statusText: 'Bad Request' });
  });

  it('should return API endpoint URL', () => {
    expect(service.getApiEndpoint()).toBe('https://env-0211641.jcloud-ver-jpe.ik-server.com/scan_token');
  });
});
