import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-network-vizualisation',
  imports: [],
  templateUrl: './network-vizualisation.component.html',
  styleUrl: './network-vizualisation.component.scss'
})
export class NetworkVizualisationComponent implements OnInit {
  @Input() tokenData: any = null;
  @Input() tokenAddress: string = '';
  
  bubblemap_vis = "assets/images/bubblemap_vis.svg";
  loadingnetwork = "assets/images/loadingnetwork.svg";
  bubbleMapsUrl: SafeResourceUrl = '';
  helioFunUrl: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.generateBubbleMapsUrl();
    this.generateHelioFunUrl();
  }

  generateBubbleMapsUrl() {
    // Use the token address from input or fallback to a default
    const address = this.tokenAddress || '8jAoEb9mwN1UmXJXgXy1jVWvhdc8icSrKKami2nXpump';
    const baseUrl = 'https://iframe.bubblemaps.io/map';
    const params = new URLSearchParams({
      address: address,
      chain: 'solana',
      partnerId: 'G5s6K3wrTLL3v5zRRZbk'
    });
    
    const fullUrl = `${baseUrl}?${params.toString()}`;
    this.bubbleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
    
  }

  generateHelioFunUrl() {
    // Use the token address from input or fallback to a default
    const address = this.tokenAddress || '8jAoEb9mwN1UmXJXgXy1jVWvhdc8icSrKKami2nXpump';
    const fullUrl = `https://helio.fun/${address}`;
    this.helioFunUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
    
  }

  openBubbleMaps() {
    const address = this.tokenAddress || '8jAoEb9mwN1UmXJXgXy1jVWvhdc8icSrKKami2nXpump';
    const baseUrl = 'https://iframe.bubblemaps.io/map';
    const params = new URLSearchParams({
      address: address,
      chain: 'solana',
      partnerId: 'G5s6K3wrTLL3v5zRRZbk'
    });
    
    const fullUrl = `${baseUrl}?${params.toString()}`;
    window.open(fullUrl, '_blank');
  }

  openHelioFun() {
    const address = this.tokenAddress || '8jAoEb9mwN1UmXJXgXy1jVWvhdc8icSrKKami2nXpump';
    const fullUrl = `https://helio.fun/${address}`;
    window.open(fullUrl, '_blank');
  }
}
