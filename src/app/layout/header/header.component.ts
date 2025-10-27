import { Component, HostListener,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    RouterLink
]
})
export class HeaderComponent {
  isMenuOpen = false;
  isMobile = false;
  logo = "assets/icon/logo.svg";
  constructor(private router: Router) {}

  ngOnInit() {
    // Handle fragment navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects.includes('#')) {
          const fragment = event.urlAfterRedirects.split('#')[1];
          setTimeout(() => {
            this.scrollToElement(fragment);
          }, 100);
        }
      });
  }

  scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
  

  // @HostListener('window:resize')
  // ngOnInit() {
  // }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
