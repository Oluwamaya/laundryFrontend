import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faNairaSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {
  public amount: number | undefined;
  public plan: string | undefined;


  faNaira = faNairaSign
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
