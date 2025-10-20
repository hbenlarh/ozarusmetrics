import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { BoxComponent } from '../glossary/box/box.component';

@Component({
  selector: 'app-tokenomics',
  imports: [HeaderComponent, FooterComponent, BoxComponent],
  templateUrl: './tokenomics.component.html',
  styleUrl: './tokenomics.component.scss'
})
export class TokenomicsComponent {
  chartData = {
    labels: ['Platform Development', 'Team & Advisors','Community Incentives','Liquidity Provision','Marketing & Partnerships','Reserve & Treasury'],
    datasets: [{
      data: [25, 15,20,20,10,10],
      backgroundColor: ['#3399FF', '#FF3377', '#FFDD33', '#33FFBB', '#7733FF','#FF9933']
    }]
  };
  
  chartOptions = {
    cutout: '70%', // makes it a "donut"
    plugins: {
      legend: { display: false }
    },
    elements: {
      arc: {
        borderWidth: 5,
        borderColor: '#14213F', 
      
      }
    }
  };
  doughnutChartType = 'doughnut';
  
}
