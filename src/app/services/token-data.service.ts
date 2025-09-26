import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenDataService {
  private tokenDataSubject = new BehaviorSubject<any>(null);
  private tokenAddressSubject = new BehaviorSubject<string>('');
  
  // Static properties as fallback
  private static _tokenData: any = null;
  private static _tokenAddress: string = '';

  public tokenData$ = this.tokenDataSubject.asObservable();
  public tokenAddress$ = this.tokenAddressSubject.asObservable();

  setTokenData(data: any) {
    console.log('TokenDataService - Setting token data:', data);
    TokenDataService._tokenData = data;
    this.tokenDataSubject.next(data);
  }

  setTokenAddress(address: string) {
    console.log('TokenDataService - Setting token address:', address);
    TokenDataService._tokenAddress = address;
    this.tokenAddressSubject.next(address);
  }

  getTokenData() {
    const data = this.tokenDataSubject.value || TokenDataService._tokenData;
    console.log('TokenDataService - Getting token data:', data);
    return data;
  }

  getTokenAddress() {
    const address = this.tokenAddressSubject.value || TokenDataService._tokenAddress;
    console.log('TokenDataService - Getting token address:', address);
    return address;
  }

  clearData() {
    this.tokenDataSubject.next(null);
    this.tokenAddressSubject.next('');
  }
}
