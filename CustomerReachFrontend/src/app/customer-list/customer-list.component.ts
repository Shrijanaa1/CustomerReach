import { Component, OnInit } from '@angular/core';
import { Customer } from '../entity/customer';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];

  //inside constructor we inject the customerService to use its method
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  // this method is used for fetching data from backend
  // It subscribes to the returned Observable and assigns the received data to the customers property.
  private getCustomers() {
    this.customerService.getCustomersList().subscribe((data) => {
      this.customers = data;
    });
  }

  updateCustomer(id: number) {
    this.router.navigate(['/customers/update-customer', id]);
  }

  deleteCustomer(id: number) {
    // Show the alert to confirm deletion
    const confirmed = window.confirm('Are you sure you want to delete?');

    // If the user clicks 'Yes', proceed with deletion
    if (confirmed) {
      this.customerService.deleteCustomer(id).subscribe(
        (data) => {
          console.log(data);
          // Fetch updated list of customers after successful deletion
          this.getCustomers();
        },
        (error) => {
          console.error(error);
          // Handle any errors that might occur during deletion (optional)
        }
      );
    }
  }

  viewCustomer(id: number) {
    this.router.navigate(['/customers/view-customer', id]);
  }
}
