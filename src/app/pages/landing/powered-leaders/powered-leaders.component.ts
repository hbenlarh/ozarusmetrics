import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-powered-leaders',
  standalone: true,
  imports: [CommonModule,SlickCarouselModule],
  templateUrl: './powered-leaders.component.html',
  styleUrls: ['./powered-leaders.component.scss']
})
export class PoweredLeadersComponent {
  partners = [
   
      { link : 'https://www.orbler.io/', name: 'orbler', logo: 'assets/logos/orbler.svg' },
      { link : 'https://www.cogtoken.network/', name: 'cogtoken', logo: 'assets/logos/cogtoken.png' },
      { link : 'https://www.manuspay.org/', name: 'manuspay', logo: 'assets/logos/manuspay.png' },
      { link : 'https://www.neurochain.ai/', name: 'neurochain', logo: 'assets/logos/ncn_black_logo.svg' },
      { link : 'https://omniminds.ai/', name: 'omniminds', logo: 'assets/leaders/crMDrMqL_400x400.png' },
      { link : 'https://cryfi.app/', name: 'cryfi', logo: 'assets/leaders/QMIpPKX3_400x400.png' },
      { link : 'https://vitaminai.online/', name: 'vitaminai', logo: 'assets/logos/logo-vitaminai.webp' },
      { link : 'https://xpayfi.io/', name: 'xpayfi', logo: 'assets/logos/payfi.png' },
      { link : 'https://www.chaingpt.org/', name: 'chaingpt', logo: 'assets/leaders/RMXAHHLa_400x400.png' },
      { link : 'https://bubblemaps.io/', name: 'bubblemaps', logo: 'assets/leaders/dj1tOY36_400x400.png' },
      { link : 'https://www.tokenmetrics.com/', name: 'tokenmetrics', logo: 'assets/leaders/lXZwT_Sn_400x400.png' },

  ];


  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
}