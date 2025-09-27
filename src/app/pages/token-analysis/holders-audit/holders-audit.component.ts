import {
  Component,
  Input,
  OnChanges,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartEvent, ActiveElement } from 'chart.js';

@Component({
  selector: 'app-holders-audit',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './holders-audit.component.html',
  styleUrls: ['./holders-audit.component.scss'],
})
export class HoldersAuditComponent implements OnChanges {
  @Input() tokenData: any = null;
  
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Chart data properties
  doughnutChartLabels: string[] = [];
  doughnutChartData: any = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#9333ea', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444',
          '#8b5cf6', '#10b981', '#f97316', '#3b82f6', '#ec4899'
        ]
      }
    ]
  };

  doughnutChartType: any = 'doughnut';
  hoveredIndex: number | null = null;

  chartOptions = {
    cutout: '60%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: { 
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as any
        },
        bodyFont: {
          size: 13
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: '#1f2937'
      }
    }
  };

  ngOnChanges() {
    if (this.tokenData) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    if (this.tokenData?.holders?.top_ten) {
      // Filter significant holders (>= 1%) and group small ones
      const significantHolders = this.tokenData.holders.top_ten.filter((holder: any) => holder.percentage >= 1.0);
      const smallHolders = this.tokenData.holders.top_ten.filter((holder: any) => holder.percentage < 1.0);
      const smallHoldersTotal = smallHolders.reduce((sum: number, holder: any) => sum + holder.percentage, 0);
      const others = 100 - this.topHundredPercentage;

      // Prepare labels and data
      const labels = significantHolders.map((holder: any, index: number) => 
        `${index + 1}. ${this.formatTokenAddress(holder.address)}`
      );
      const data = significantHolders.map((holder: any) => holder.percentage);
      const colors = this.doughnutChartData.datasets[0].backgroundColor.slice(0, significantHolders.length);

      // Add small holders and others if needed
      if (smallHoldersTotal > 0) {
        labels.push('Small Holders');
        data.push(smallHoldersTotal);
        colors.push('#6366f1');
      }

      if (others > 0) {
        labels.push('Others');
        data.push(others);
        colors.push('#6b7280');
      }

      this.doughnutChartLabels = labels;
      this.doughnutChartData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors
          }
        ]
      };
    }
  }

  formatTokenAddress(address: string): string {
    if (!address || address.length < 10) {
      return address;
    }
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  }

  onChartHover(e: any): void {
    const event = e.event as ChartEvent;
    const active = e.active as ActiveElement[];
  
    if (active?.length) {
      this.hoveredIndex = active[0].index;
    } else {
      this.hoveredIndex = null;
    }
  }

  // Getters for template
  get totalHolders(): number {
    return this.tokenData?.holders?.total_holders || 0;
  }

  get topTenPercentage(): number {
    return this.tokenData?.holders?.top_ten_per || 0;
  }

  get topHundredPercentage(): number {
    return this.tokenData?.holders?.top_hundred_per || 0;
  }

  get topTenHolders(): any[] {
    return this.tokenData?.holders?.top_ten || [];
  }

  get concentrationRisk(): string {
    const topTen = this.topTenPercentage;
    if (topTen > 80) return 'High Risk';
    if (topTen > 50) return 'Medium Risk';
    return 'Low Risk';
  }

  get concentrationClass(): string {
    const topTen = this.topTenPercentage;
    if (topTen > 80) return 'red';
    if (topTen > 50) return 'yellow';
    return 'green';
  }

  get mintAuthorityDisabled(): boolean {
    return this.tokenData?.security?.mint_auth_disabled || false;
  }

  get freezeAuthority(): boolean {
    return this.tokenData?.security?.freeze_authority || false;
  }

  get securityMessages(): string[] {
    return this.tokenData?.security?.message || [];
  }

  getMessageIconClass(message: string): string {
    if (message.toLowerCase().includes('good') || message.toLowerCase().includes('safe')) {
      return 'fa-check-circle ok';
    } else if (message.toLowerCase().includes('warning') || message.toLowerCase().includes('caution')) {
      return 'fa-exclamation-triangle warn';
    }
    return 'fa-info-circle';
  }

  cleanMessage(message: string): string {
    return message.replace(/[^\w\s.,!?-]/g, '').trim();
  }
}