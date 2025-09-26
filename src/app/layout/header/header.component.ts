import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule
  ]
})
export class HeaderComponent {
  isMenuOpen = false;
  isMobile = false;
  logo = "assets/icon/logo.svg";

  @HostListener('window:resize')
  ngOnInit() {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
