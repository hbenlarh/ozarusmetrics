import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-powered-leaders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './powered-leaders.component.html',
  styleUrls: ['./powered-leaders.component.scss']
})
export class PoweredLeadersComponent {
  partners = [
    { name: 'ChainGPT', logo: 'assets/images/chain_gpt.png' },
    { name: 'Streamflow', logo: 'assets/images/streamflow.png' },
    { name: 'Phantom', logo: 'assets/images/phantom.png' },
    { name: 'Helius', logo: 'assets/images/helius.png' },
    { name: 'Jupiter', logo: 'assets/images/jupiter.png' },
    { name: 'Bubblemaps', logo: 'assets/images/bubble_maps.png' },
  ];
}
