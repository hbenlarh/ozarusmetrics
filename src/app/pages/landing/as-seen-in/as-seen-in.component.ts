import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-as-seen-in',
  imports: [SlickCarouselModule,CommonModule],
  templateUrl: './as-seen-in.component.html',
  styleUrl: './as-seen-in.component.scss'
})
export class AsSeenInComponent {
  seens =[
    { link: 'https://techbullion.com/ozarus-redefining-crypto-safety-with-ai-powered-token-intelligence/', logo: 'assets/logos/TechBullionLogo-3.png', name: 'techbullion.com' },
    { link: 'https://asiatokenfund.com/ozarus-the-ai-shield-of-solana/', logo: 'assets/logos/Aggregator-Logo1.png', name: 'asiatokenfund.com' },
    { link: 'https://www.nfttrendings.com/save-with-ozarus-turning-token-utility-into-real-value/', logo: 'assets/logos/ascasc.png', name: 'fttrendings.com' },
    { link: 'https://www.nftcryptoupdate.com/2025/09/17/ozarus-elite-signals-turning-noise-into-profitable-trades/', logo: 'assets/logos/NFT-CRYPTO-UPDATE-LOGO-300x73.png', name: 'nftcryptoupdate.com' },
    { link: 'https://www.encryptbusiness.com/ozarus-delta-analyzer-x100/', logo: 'assets/logos/EB.png', name: 'encryptbusiness.com' },
    { link: 'https://buzzblockchain.com/2025/09/17/ozarus-whale-alerts/', logo: 'assets/logos/logo-copy.png', name: 'https://buzzblockchain.com' },
    { link: 'https://fastavow.com/ozarus-launchpad-verified-fastavow-feature/ ', logo: 'assets/logos/FAST-1.png', name: 'fastavow.com' },
  ]

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    arrows: false,
    dots: true,
   
  }
}
