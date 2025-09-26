import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-holders-audit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './holders-audit.component.html',
  styleUrls: ['./holders-audit.component.scss'],
})
export class HoldersAuditComponent implements AfterViewInit, OnChanges {
  @Input() tokenData: any = null;
  @ViewChild('holderCanvas') holderCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    console.log('HoldersAudit Component - Constructor called');
  }

  ngOnChanges() {
    console.log('HoldersAudit Component - tokenData received:', this.tokenData);
    console.log('HoldersAudit Component - Security data:', this.tokenData?.security);
    console.log('HoldersAudit Component - Holders data:', this.tokenData?.holders);
  }

  // Getters for holder data
  get totalHolders(): number {
    const value = this.tokenData?.holders?.total_holders || 0;
    console.log('HoldersAudit - totalHolders:', value);
    return value;
  }

  get topTenPercentage(): number {
    const value = this.tokenData?.holders?.top_ten_per || 0;
    console.log('HoldersAudit - topTenPercentage:', value);
    return value;
  }

  get topHundredPercentage(): number {
    const value = this.tokenData?.holders?.top_hundred_per || 0;
    console.log('HoldersAudit - topHundredPercentage:', value);
    return value;
  }

  get topTenHolders(): any[] {
    const value = this.tokenData?.holders?.top_ten || [];
    console.log('HoldersAudit - topTenHolders:', value);
    return value;
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

  // Security data getters
  get mintAuthorityDisabled(): boolean {
    const value = this.tokenData?.security?.mint_auth_disabled || false;
    console.log('HoldersAudit - mintAuthorityDisabled:', value);
    return value;
  }

  get freezeAuthority(): boolean {
    const value = this.tokenData?.security?.freeze_authority || false;
    console.log('HoldersAudit - freezeAuthority:', value);
    return value;
  }

  get riskScore(): number {
    const value = this.tokenData?.security?.risk_score || 0;
    console.log('HoldersAudit - riskScore:', value);
    return value;
  }

  get securityMessages(): string[] {
    const value = this.tokenData?.security?.message || [];
    console.log('HoldersAudit - securityMessages:', value);
    return value;
  }

  // Method to clean security messages
  cleanMessage(message: string): string {
    return message.replace(/[✅⚠️❗🟡]/g, '').trim();
  }

  // Method to get message icon class
  getMessageIconClass(message: string): string {
    if (message.includes('✅')) return 'fa-circle-check ok';
    if (message.includes('⚠️') || message.includes('❗')) return 'fa-circle-exclamation warn';
    return 'fa-circle-info';
  }

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables, ChartDataLabels);

    // Plugin custom pour tracer les lignes
    const calloutLines = {
      id: 'calloutLines',
      afterDraw(chart: any) {
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);
        ctx.save();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;

        meta.data.forEach((arc: any) => {
          const angle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2;
          const r = arc.outerRadius;

          // Bord du donut
          const startX = chart.width / 2 + Math.cos(angle) * r;
          const startY = chart.height / 2 + Math.sin(angle) * r;

          // Fin de la ligne (un peu plus loin dehors)
          const endX = chart.width / 2 + Math.cos(angle) * (r + 40);
          const endY = chart.height / 2 + Math.sin(angle) * (r + 40);

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        });

        ctx.restore();
      },
    };
    const calloutLabels = {
      id: 'calloutLabels',
      afterDraw(chart: any) {
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);
        const colors = chart.data.datasets[0].backgroundColor as string[];

        ctx.save();
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        meta.data.forEach((arc: any, index: number) => {
          const angle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2;
          const r = arc.outerRadius;

          // Point au bord du donut
          const startX = chart.width / 2 + Math.cos(angle) * r;
          const startY = chart.height / 2 + Math.sin(angle) * r;

          const midX = chart.width / 2 + Math.cos(angle) * (r + 20);
          const midY = chart.height / 2 + Math.sin(angle) * (r + 20);
          // Point final plus loin
          const endX = chart.width / 2 + Math.cos(angle) * (r + 30);
          const endY = chart.height / 2 + Math.sin(angle) * (r + 30);

          ctx.strokeStyle = colors[index];
          ctx.lineWidth = 2;

          // Ligne
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.lineWidth = 1;
          ctx.stroke();

          // Texte simple avec label et pourcentage
          const label = chart.data.labels?.[index] as string;
          const value = chart.data.datasets[0].data[index];
          
          // Dessiner un petit carré coloré
          ctx.fillStyle = colors[index];
          ctx.fillRect(endX + Math.cos(angle) * 15 - 3, endY + Math.sin(angle) * 15 - 3, 6, 6);
          
          // Texte du label et pourcentage
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 12px Arial';
          ctx.fillText(
            `${label}: ${value.toFixed(1)}%`,
            endX + Math.cos(angle) * 25,
            endY + Math.sin(angle) * 25
          );
        });

        ctx.restore();
      },
    };
    // Calculate distribution from API data
    const topTen = this.topTenPercentage;
    const topHundred = this.topHundredPercentage;
    const top11to100 = topHundred - topTen;
    const others = 100 - topHundred;

    new Chart(this.holderCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Top 10', 'Top 11-100', 'Others'],
        datasets: [
          {
            data: [topTen, top11to100, others],
            backgroundColor: ['#9333ea', '#06b6d4', '#22c55e'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: '60%',
        layout: {
          padding: 50   // ajoute de l'espace autour
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
          datalabels: { display: false }, // désactiver plugin datalabels
        },
      },
      plugins: [calloutLabels], // utiliser plugin custom
    });
  }
}
