import { Component, OnInit } from '@angular/core';
import { Customer } from '../entity/customer';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  customer: Customer = new Customer();

  constructor(
    private customerService: CustomerService, //injecting customerService to use its method
    private router: Router //injecting router to navigate path, after successfully adding data we need to go somewhere
  ) {}
  ngOnInit(): void {}

  saveCustomer() {
    this.customerService.createCustomer(this.customer).subscribe(
      (data) => {
        console.log(data);
        this.goToCustomerList();
      },
      (error) => console.log(error)
    );
  }

  //after successfully adding data we need to go somewher
  goToCustomerList() {
    this.router.navigate(['/dashboard/customers']);
  }

  OnSubmit() {
    console.log(this.customer);
    this.saveCustomer();
  }
}
