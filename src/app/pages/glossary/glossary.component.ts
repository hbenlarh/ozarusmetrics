import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { BoxComponent } from './box/box.component';

@Component({
  selector: 'app-glossary',
  imports: [HeaderComponent, FooterComponent, BoxComponent],
  templateUrl: './glossary.component.html',
  styleUrl: './glossary.component.scss'
})
export class GlossaryComponent {

}

