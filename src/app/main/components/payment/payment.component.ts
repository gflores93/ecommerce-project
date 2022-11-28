import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    render({
      id: '#paypalButtons',
      currency: 'EUR',
      value: '28.4',
      onApprove: (details) => {
        alert('Transaction successfull');
        console.log(details);
      }
    });
  }
}
