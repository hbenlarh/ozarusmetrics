import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-token',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address-token.component.html',
  styleUrls: ['./address-token.component.scss']
})
export class AddressTokenComponent {
  address = '8jAoEb9mwN1UmXJXgXy1jVWvhdc8icSrKKami2nXpump';
  copied = false;

  // Display truncated address
  get displayAddress(): string {
    if (this.address.length <= 12) {
      return this.address;
    }
    return `${this.address.slice(0, 4)}...${this.address.slice(-5)}`;
  }

  copyToClipboard() {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(this.address).then(() => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
        this.fallbackCopyToClipboard(this.address);
      });
    } else {
      this.fallbackCopyToClipboard(this.address);
    }
  }

  private fallbackCopyToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    } catch (err) {
      console.error('Fallback copy failed: ', err);
    }
    
    document.body.removeChild(textArea);
  }
}

