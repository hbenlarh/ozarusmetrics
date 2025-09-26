import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDebugService {
  private readonly API_BASE_URL = 'https://env-0211641.jcloud-ver-jpe.ik-server.com';
  private readonly SCAN_ENDPOINT = '/scan_token';

  constructor(private http: HttpClient) {}

  /**
   * Test the API endpoint with a simple GET request first
   */
  testApiConnection(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    console.log('Testing API connection...');
    return this.http.get(`${this.API_BASE_URL}${this.SCAN_ENDPOINT}`, { headers });
  }

  /**
   * Test the API with a POST request using different content types
   */
  testApiWithPost(tokenAddress: string): Observable<any> {
    const request = { token_address: tokenAddress };
    
    // Try with different content types
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    console.log('Testing POST request:', {
      url: `${this.API_BASE_URL}${this.SCAN_ENDPOINT}`,
      request: request
    });

    return this.http.post(`${this.API_BASE_URL}${this.SCAN_ENDPOINT}`, request, { headers });
  }

  /**
   * Test with URL-encoded data instead of JSON
   */
  testApiWithUrlEncoded(tokenAddress: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('token_address', tokenAddress);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });

    console.log('Testing with URL-encoded data:', {
      url: `${this.API_BASE_URL}${this.SCAN_ENDPOINT}`,
      body: body.toString()
    });

    return this.http.post(`${this.API_BASE_URL}${this.SCAN_ENDPOINT}`, body.toString(), { headers });
  }

  /**
   * Test with different HTTP methods
   */
  testApiWithPut(tokenAddress: string): Observable<any> {
    const request = { token_address: tokenAddress };
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    console.log('Testing PUT request:', {
      url: `${this.API_BASE_URL}${this.SCAN_ENDPOINT}`,
      request: request
    });

    return this.http.put(`${this.API_BASE_URL}${this.SCAN_ENDPOINT}`, request, { headers });
  }

  /**
   * Test with form data instead of JSON
   */
  testApiWithFormData(tokenAddress: string): Observable<any> {
    const formData = new FormData();
    formData.append('token_address', tokenAddress);

    console.log('Testing with FormData:', formData);

    return this.http.post(`${this.API_BASE_URL}${this.SCAN_ENDPOINT}`, formData);
  }
}
