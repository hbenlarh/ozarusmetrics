import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    console.log('TokenOverview - tokenData:', this.tokenData);
    console.log('TokenOverview - basic_info:', this.tokenData?.basic_info);
    console.log('TokenOverview - name:', this.tokenData?.basic_info?.name);
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
}
