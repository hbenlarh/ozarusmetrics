import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listed-tracked',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listed-tracked.component.html',
  styleUrls: ['./listed-tracked.component.scss']
})
export class ListedTrackedComponent {
  logos: string[] = [
    'assets/images/bleu.png',
    'assets/images/dino.png',
    'assets/images/blanc.png',
    'assets/images/bleu.png',
    'assets/images/dino.png',
    'assets/images/blanc.png',
    'assets/images/bleu.png',
    'assets/images/dino.png',
    'assets/images/blanc.png',
    'assets/images/bleu.png',
    'assets/images/dino.png',
    'assets/images/blanc.png',
  ];
}
