import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-protect-trade',
  imports: [RouterLink],
  templateUrl: './protect-trade.component.html',
  styleUrl: './protect-trade.component.scss'
})
export class ProtectTradeComponent {
  check_green = 'assets/icon/check_green.svg';
}
