import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LogoItem {
  src: string;
  url: string;
  alt: string;
}

@Component({
  selector: 'app-listed-tracked',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listed-tracked.component.html',
  styleUrls: ['./listed-tracked.component.scss']
})
export class ListedTrackedComponent {
  logos: LogoItem[] = [
    { src: 'assets/logos/logo.png', url: 'https://pump.fun/coin/8jAoEb9mwN1UmXJXgXy1jVWvhdc8icSrKKami2nXpump', alt: 'Pump.fun' },
    { src: 'assets/logos/logo3.svg', url: 'https://dexscreener.com/solana/28zpcivc5cr1ze9sntbxddwhzejorhhrgkroppojyauf', alt: 'DexScreener' },
    { src: 'assets/logos/logo4.svg', url: 'https://www.geckoterminal.com/solana/pools/28zpCivc5CR1zE9SntbXdDwhZeJoRHhRGkroPPojYAUf', alt: 'GeckoTerminal' },
    { src: 'assets/logos/logo5.png', url: 'https://birdeye.so/solana/token/8jAoEb9mwN1UmXJXgXy1jVWvhdc8icSrKKami2nXpump?tab=security', alt: 'Birdeye' },
    { src: 'assets/logos/logo6.svg', url: 'https://solanahunters.com/coin/8jAoEb9mwN1UmXJXgXy1jVWvhdc8icSrKKami2nXpump', alt: 'Solana Hunters' },
    { src: 'assets/logos/logo7.png', url: 'https://coingem.com/solana/8jAoEb9mwN1UmXJXgXy1jVWvhdc8icSrKKami2nXpump', alt: 'CoinGem' },
    { src: 'assets/logos/logo8.jpg', url: 'https://top100token.com/solana/8jAoEb9mwN1UmXJXgXy1jVWvhdc8icSrKKami2nXpump', alt: 'Top100Token' },
    { src: 'assets/logos/logo9.png', url: 'https://coinboom.net/coin/ozarus', alt: 'CoinBoom' },
    { src: 'assets/logos/logo10.png', url: 'https://coinbazooka.com/coin/ozarus-8jaump', alt: 'CoinBazooka' },
    { src: 'assets/logos/logo11.svg', url: 'https://www.dextools.io/app/en/solana/pair-explorer/8jAoEb9mwN1UmXJXgXy1jVWvhdc8icSrKKami2nXpump?t=1756769836821', alt: 'DexTools' },
    { src: 'assets/logos/logo12.svg', url: 'https://www.coingecko.com/en/coins/ozarus?utm_campaign=coin-approve&utm_medium=email&utm_source=listing', alt: 'CoinGecko' },
    { src: 'assets/logos/logo13.png', url: 'https://www.coinscope.co/coin/ozarus', alt: 'CoinScope' },
    { src: 'assets/logos/logo14.png', url: 'https://coinsniper.net/coin/85413', alt: 'CoinSniper' },
    { src: 'assets/logos/logo15.png', url: 'https://cntoken.io/coin/49141', alt: 'CNToken' },
    { src: 'assets/logos/logo16.png', url: 'https://coinmooner.com/coins/ozarus-ozarus', alt: 'CoinMooner' },
    { src: 'assets/logos/logo17.svg', url: 'https://fr.beincrypto.com/convertir/ozarus-to-usd/', alt: 'BeInCrypto' },
    { src: 'assets/logos/logo18.png', url: 'https://finary.com/fr/crypto/coins/ozarus', alt: 'Finary' },
    { src: 'assets/logos/logo19.png', url: 'https://www.xt.com/id/price/coin/ozarus', alt: 'XT.com' },
    { src: 'assets/logos/logo20.svg', url: 'https://tradesanta.com/kr/converter/ozarus-eth', alt: 'TradeSanta' },
    { src: 'assets/logos/logo21.png', url: 'https://coincatapult.com/coin/ozarus-ozarus', alt: 'CoinCatapult' },
    { src: 'assets/logos/logo22.png', url: 'https://gemfinder.cc/gem/27664', alt: 'GemFinder' },
  ];
}