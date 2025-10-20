import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-box',
  imports: [CommonModule],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent {
  @Input() icon: String = "";
  @Input() title: String = "";
  @Input() text: String = "";
  @Input() customClass = ''; // Passed from parent
}

