import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-token-overview',
  imports: [CommonModule],
  templateUrl: './token-overview.component.html',
  styleUrl: './token-overview.component.scss'
})
export class TokenOverviewComponent {
  @Input() tokenData: any = null;
  @Input() tokenAddress: string = '';

  bitcoin = "assets/images/bitcoin.png";
  pdf = "assets/icon/pdf.svg";
  reload = "assets/icon/reload.svg";
  copy_icon = "assets/icon/copy_icon.svg";
  market_cap = "assets/icon/market_cap.svg";
  liquidity = "assets/icon/liquidity.svg";
  control = "assets/icon/control.svg";

  get tokenName(): string {
    return this.tokenData?.basic_info?.name || 'Unknown Token';
  }

  get tokenSymbol(): string {
    return this.tokenData?.basic_info?.symbol || 'UNKNOWN';
  }

  get tokenImage(): string {
    return this.tokenData?.basic_info?.image || this.bitcoin;
  }

  get marketCap(): string {
    return this.tokenData?.market_data?.market_cap_str || '0';
  }

  get liquidityAmount(): string {
    return this.tokenData?.market_data?.liquidity_str || '0';
  }

  get riskScore(): number {
    return this.tokenData?.security?.risk_score || 0;
  }

  // Copy functionality - only adding methods, not changing design
  copyToClipboard(text: string) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy: ', err);
        this.fallbackCopyToClipboard(text);
      });
    } else {
      this.fallbackCopyToClipboard(text);
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
      console.log('Copied to clipboard!');
    } catch (err) {
      console.error('Fallback copy failed: ', err);
    }
    
    document.body.removeChild(textArea);
  }

  copyContractAddress() {
    this.copyToClipboard(this.tokenAddress);
  }

  copyCreatorAddress() {
    const creatorAddress = this.tokenData?.basic_info?.creator?.address;
    if (creatorAddress) {
      this.copyToClipboard(creatorAddress);
    }
  }
  getTweetContent(): string {
    const name = this.tokenSymbol || 'Unknown';
    const score = this.riskScore || 0;
    const formattedScore = new DecimalPipe('en-US').transform(score, '1.2-2');
    const address = this.tokenAddress || 'N/A';

    const message = Array.isArray(this.tokenData?.security?.message)
      ? this.tokenData.security.message.slice(3, 5).join('\n')
      : this.tokenData?.security?.message || 'No additional information available.';

    const url = 'https://ozarusmetrics.com/token-analysis/' + address;
    const riskInfo = this.getRiskLevel(score);

    return encodeURIComponent(
      `$${name} - Safety Score: ${formattedScore}% (${riskInfo.text})\n\n${address}\n\n${message}\n....\n\nSee more data at #OZARUS: ${url}`
    );
  }
  // Add the getRiskLevel method
  getRiskLevel(score: number): { text: string; color: string } {
    if (score >= 80) return { text: 'Low Risk', color: 'green' };
    if (score >= 60) return { text: 'Medium Risk', color: 'yellow' };
    if (score >= 40) return { text: 'High Risk', color: 'orange' };
    return { text: 'Very High Risk', color: 'red' };
  }

  // Add the share method
  shareOnTwitter() {
    const tweetContent = this.getTweetContent();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetContent}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  }

}