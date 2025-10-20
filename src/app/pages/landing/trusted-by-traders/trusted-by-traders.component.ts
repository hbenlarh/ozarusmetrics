import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-trusted-by-traders',
  imports: [SlickCarouselModule,CommonModule],
  templateUrl: './trusted-by-traders.component.html',
  styleUrl: './trusted-by-traders.component.scss'
})
export class TrustedByTradersComponent {
  // Slick slider configuration
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
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
  };

  // Tweet data for the slider

   tweets = [
    {
        id: 1,
        url: "https://x.com/Crypto_Vertex1/status/1948663032831455582",
        avatar: "assets/avatars/dFtgrhsY_400x400.jpg",
        name: "Crypto Vertex",
        handle: "@Crypto_Vertex1",
        text: "$OZARUS might just be that one. It's not noise, it's signal. Not just a token, a scanner, a shield, your on-chain early warning system.",
        retweets: 112,
        likes: 358
    },
    {
        id: 2,
        url: "https://x.com/MrDariBoss/status/1948705336946557314",
        avatar: "assets/avatars/HaeLPi6Q_400x400.jpg",
        name: "Mr Dari",
        handle: "@MrDariBoss",
        text: "What if Elon Musk launched a memecoin... but instead of hype, it was built to protect?",
        retweets: 98,
        likes: 412
    },
    // {
    //     id: 3,
    //     url: "https://x.com/_iioioi/status/1949450112192713101",
    //     avatar: "https://placehold.co/50x50/1e293b/ffffff?text=CB",
    //     name: "The Crypto Butler",
    //     handle: "@__iioioi",
    //     text: "To those who scan before they ape. To those who don't chase hype they follow signal.",
    //     retweets: 251,
    //     likes: 843
    // },
    {
        id: 4, 
        url: "https://x.com/MonkProfit/status/1953094457215037716",
        avatar: "assets/avatars/IOX-ESko_400x400.jpg",
        name: "Crypto Monk",
        handle: "@MonkProfit",
        text: "Out of tens of thousands of tokens launched on PumpFun... Only 0.06% have real potential. Most? Rugs, noise, and vapor.",
        retweets: 189,
        likes: 621
    },
    {
        id: 5,
        url: "https://x.com/TalTCrypto/status/1961119963407687692",
        avatar: "assets/avatars/0TG1TYnr_400x400.jpg",
        name: "talT",
        handle: "@TalTCrypto",
        text: "Don't sleep on this train, fam! All eyes on this memecoin madness. If you wanna ride the wave, you better get in NOW or risk missing the boat!",
        retweets: 76,
        likes: 234
    },
    {
        id: 6,
        url: "https://x.com/thenexus_team/status/1961437799145750908",
        avatar: "assets/avatars/O-rnePH3_400x400.jpg",
        name: "Crypto Nexus News",
        handle: "@thenexus_team",
        text: "Solana is heating up : and the next X100 shield just went LIVE. Fresh launch. Perfect entry.",
        retweets: 143,
        likes: 289
    },
   
    {
        id: 8,
        url: "https://x.com/CryptoWhaleLabs/status/1961438410729787476",
        avatar: "assets/avatars/3e4018bdcc898.jpg",
        name: "CRYPTO WHALE LABS",
        handle: "@CryptoWhaleLabs",
        text: "30K+ tokens launched daily on Solana. Only 0.04% are legit.",
        retweets: 305,
        likes: 1042
    },
    {
        id: 9,
        url: "https://x.com/CoinHunterAMA/status/1961440799998247054",
        avatar: "assets/avatars/8xD_o6IR_400x400.jpg",
        name: "Coin Hunter || AMA + Space",
        handle: "@CoinHunterAMA",
        text: "They said Solana is pumping. We say: trade safer while it pumps.",
        retweets: 156,
        likes: 401
    },
    {
        id: 10,
        url: "https://x.com/Crypto_Royal_Co/status/1961441171471053029",
        avatar: "assets/avatars/mW8-yDVU_400x400.jpg",
        name: "CRYPTO ROYAL COMMUNITY",
        handle: "@Crypto_Royal_Co",
        text: "Solana is breaking records. Now it's time to trade smarter, safer.",
        retweets: 210,
        likes: 550
    },
    {
        id: 11,
        url: "https://x.com/DefiSparco/status/1948688154195620051",
        avatar: "assets/avatars/PU105QNR_400x400.jpg",
        name: "Sparco DeFi",
        handle: "@DefiSparco",
        text: "The difference between broke & breakthrough? One memecoin. One moment. One shot.",
        retweets: 130,
        likes: 488
    },
    {
        id: 12,
        url: "https://x.com/1CrypTina/status/1949224839148917142",
        avatar: "assets/avatars/ORWyCrce_400x400.png",
        name: "CrypTina",
        handle: "@1CrypTina",
        text: "Web3 moves fast - the smartest players move with precision. That's where $OZARUS comes in!",
        retweets: 201,
        likes: 745
    },
    {
        id: 13,
        url: "https://x.com/1Y8__/status/1949538063710920781",
        avatar: "assets/avatars/gxKBxG_s_400x400.jpg",
        name: "THE CRYPTO ELIANA",
        handle: "@1Y8__",
        text: "$CHILLGUY scanned by $OZARUS. Safety Score: 73.71%. Mint disabled | No freeze | Renounced",
        retweets: 95,
        likes: 312
    },
    {
        id: 14,
        url: "https://x.com/Cryptoo_Pioneer/status/1968301480995336575",
        avatar: "assets/avatars/5_CCFqBu_400x400.jpg",
        name: "Crypto Pioneer",
        handle: "@Cryptoo_Pioneer",
        text: "Crypto is full of noise. Fake pumps. Exit liquidity. But sometimes, a meme becomes a revolution.",
        retweets: 180,
        likes: 640
    },
    // {
    //     id: 15,
    //     url: "https://x.com/CryptoWhales02/status/1968300114553745849",
    //     avatar: "https://placehold.co/50x50/1e293b/ffffff?text=CW",
    //     name: "Crypto Whales",
    //     handle: "@CryptoWhales02",
    //     text: "The Next x100 Meme Revolution Degens don't just chase pumps... we create HYPUMPS.",
    //     retweets: 250,
    //     likes: 890
    // }
];
}
