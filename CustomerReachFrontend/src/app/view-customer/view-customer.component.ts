import { Component, OnInit } from '@angular/core';
import { Customer } from '../entity/customer';
import { CustomerService } from '../service/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
})
export class ViewCustomerComponent implements OnInit {
  id!: number;
  customer!: Customer;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params[`id`];

    // once we pass this id to rest api, it will return customer object of this id.
    this.customer = new Customer();
    this.customerService.getCustomerById(this.id).subscribe((data) => {
      this.customer = data;
    });
  }
}
