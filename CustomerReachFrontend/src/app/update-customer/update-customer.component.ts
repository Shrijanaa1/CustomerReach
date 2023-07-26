import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../entity/customer';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css'],
})
export class UpdateCustomerComponent implements OnInit {
  id!: number;
  customer: Customer = new Customer();
  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params[`id`];
    this.customerService.getCustomerById(this.id).subscribe(
      (data) => {
        this.customer = data;
      },

      (error) => {
        console.log(error);
        throw new Error('An error occurred'); // Throw an error using the `throw` statement
      }
    );

    // error => console.log(error));
  }

  OnSubmit() {
    this.customerService.updateCustomer(this.id, this.customer).subscribe(
      (data) => {
        this.goToCustomerList();
      },
      (error) => console.log(error)
    );
  }

  goToCustomerList() {
    this.router.navigate(['/dashboard/customers']);
  }
}
