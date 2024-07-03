import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-request',
  standalone: true,
  imports: [],
  templateUrl: './order-request.component.html',
  styleUrl: './order-request.component.css'
})
export class OrderRequestComponent {
  amount: number | null = null;

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {
    const state = window.history.state;
    if (state && state.amount) {
      this.amount = state.amount;
      console.log('Amount received:', this.amount);
    } else {
      console.log('No state found in navigation.');
    }
  }

}
