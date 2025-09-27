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
    TokenDataService._tokenData = data;
    this.tokenDataSubject.next(data);
  }

  setTokenAddress(address: string) {
    TokenDataService._tokenAddress = address;
    this.tokenAddressSubject.next(address);
  }

  getTokenData() {
    return this.tokenDataSubject.value || TokenDataService._tokenData;
  }

  getTokenAddress() {
    return this.tokenAddressSubject.value || TokenDataService._tokenAddress;
  }

  clearData() {
    this.tokenDataSubject.next(null);
    this.tokenAddressSubject.next('');
  }
}
