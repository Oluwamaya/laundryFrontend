import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  public amount: number | undefined;
  public plan: string | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    console.log(this.route);
    
    this.route.queryParams.subscribe(params => {
      this.amount = +params['amount'];
      this.plan = params['plan'];
      console.log('Amount received:', this.amount);
      console.log('Plan received:', this.plan);
    });
  }
}
