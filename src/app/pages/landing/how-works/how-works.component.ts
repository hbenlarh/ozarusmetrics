import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
  extra?: string[] | boolean;
}

@Component({
  selector: 'app-how-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-works.component.html',
  styleUrls: ['./how-works.component.scss'],
})
export class HowWorksComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // === ViewChild refs ===
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('gaugeCanvas') gaugeCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('liquidityCanvas') liquidityCanvas!: ElementRef<HTMLCanvasElement>;

  // === Data examples ===
  donutData = {
    labels: ['A', 'B', 'C', 'D'],
    datasets: [
      {
        data: [25, 20, 15, 40],
        backgroundColor: ['#38bdf8', '#818cf8', '#34d399', '#0ea5e9'],
        borderWidth: 0,
      },
    ],
  };

  gaugeScore = 87;

  liquidityData = [20, 40, 60, 65, 80];

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    this.createDonutChart();
    this.createGaugeChart();
    this.createLiquidityChart();
  }

  // === CHART FACTORIES ===

  private createDonutChart() {
    if (!this.chartCanvas) return;
    new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: this.donutData,
      options: {
        cutout: '45%',
        plugins: { legend: { display: false } },
      },
    });
  }

  private createGaugeChart() {
    if (!this.gaugeCanvas) return;
    new Chart(this.gaugeCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [this.gaugeScore, 100 - this.gaugeScore],
            backgroundColor: ['#4fd1c5', '#e2e8f0'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        rotation: -90,
        circumference: 180,
        cutout: '55%',
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
      },
      plugins: [this.gaugeTextPlugin()],
    });
  }

  private gaugeTextPlugin() {
    return {
      id: 'centerText',
      afterDraw: (chart: any) => {
        const {
          ctx,
          chartArea: { width, height, top, bottom, left, right },
        } = chart;
        const xCenter = width / 2;
        const yCenter = top + height / 1.2;
        const score = chart.data.datasets[0].data[0];

        ctx.save();
        ctx.textAlign = 'center';

        // Score
        ctx.fillStyle = '#4fd1c5';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText(score, xCenter, yCenter);

        // Label
        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#9ca3af';
        ctx.fillText('SCORE', xCenter, yCenter + 22);

        // Bounds
        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#9ca3af';
        ctx.fillText('0', left + 15, bottom);
        ctx.fillText('100', right - 15, bottom);
        ctx.restore();
      },
    };
  }

  private createLiquidityChart() {
    if (!this.liquidityCanvas) return;
    new Chart(this.liquidityCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Liquidity',
            data: this.liquidityData,
            borderColor: '#4fd1c5',
            backgroundColor: '#d1eaff',
            fill: { target: 'origin' },
            tension: 0.3,
            borderWidth: 2,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: { grid: { display: false }, ticks: { display: false } },
          y: {
            grid: { color: '#2d3748', lineWidth: 1 },
            ticks: { display: false },
            afterBuildTicks: (axis) => {
              // Force 4 horizontal lines
              const min = 0;
              const max = 100;
              axis.ticks = [
                { value: min },
                { value: (max - min) * 0.33 },
                { value: (max - min) * 0.66 },
                { value: max },
              ];
            },
          },
        },
      },
      plugins: [this.backgroundPlugin()],
    });
  }

  private backgroundPlugin() {
    return {
      id: 'customCanvasBackground',
      beforeDraw: (chart: any) => {
        const ctx = chart.ctx;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#0f172a'; // background color
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    };
  }

  // === Assets for steps ===
  paste_path = 'assets/icon/paste_purple.png';
  brain_path = 'assets/icon/brain_purple.png';
  forward_path = 'assets/icon/forward_purple.png';
  pdf_path = 'assets/icon/pdf.png';
  twitter_path = 'assets/icon/twitter.png';
  jauge = 'assets/images/jauge.svg';
  distribution = 'assets/images/distribution.svg';
  liquidity = 'assets/images/liquidity.svg';

  // === Steps ===
  steps: Step[] = [
    {
      id: 1,
      title: 'Paste Token Address',
      description:
        'Simply paste any Solana token address into our scanner. Our System immediately begins comprehensive analysis.',
      icon: this.paste_path,
    },
    {
      id: 2,
      title: 'AI Analysis & Scoring',
      description: 'Our AI analyzes supply distribution...',
      icon: this.brain_path,
      extra: ['Supply Analysis', 'Holder Patterns', 'Liquidity Depth'],
    },
    {
      id: 3,
      title: 'Act & Share',
      description: 'Get actionable insights...',
      icon: this.forward_path,
      extra: true,
    },
  ];

  isArray(val: any): val is string[] {
    return Array.isArray(val);
  }
}
