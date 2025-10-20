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
  seen =[
    { link: 'https://www.2m.com/', logo: 'assets/logos/2m.png' },
  ]
}
