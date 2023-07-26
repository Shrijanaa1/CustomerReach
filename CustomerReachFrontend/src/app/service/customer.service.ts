import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../entity/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private allCustomers = 'http://localhost:8805/api/v1/getCustomers';
  private addCustomers = 'http://localhost:8805/api/v1/addCustomers';
  private getCustomer = 'http://localhost:8805/api/v1/getCustomer';
  private updateCustomers = 'http://localhost:8805/api/v1/updateCustomer';
  private deleteCustomers = 'http://localhost:8805/api/v1/deleteCustomer';

  // For injecting HttpClientModule
  // allows the CustomerService to make HTTP requests.
  constructor(private httpClient: HttpClient) {}

  // <Customer[]> --> This means the type is array of Customer
  // when the getCustomersList() method is called, it sends an HTTP GET request to the specified URL and expects a response of type Customer[]. The response is wrapped in an Observable, which can be subscribed to in order to retrieve the data asynchronously.
  //  url is placed inside backtick ``
  getCustomersList(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.allCustomers}`);
  }

  // //This is post request so we have to send data in body of post method
  // createCustomer(customer: Customer): Observable<Object>{
  //   return this.httpClient.post(`${this.baseURL}`, customer);
  // }

  //now we are going to pass as form data
  createCustomer(customer: Customer): Observable<Object> {
    return this.httpClient.post(`${this.addCustomers}`, customer);
  }

  //get customer by id
  getCustomerById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.getCustomer}/${id}`);
    // return this.httpClient.get(`${this.updateURL}/${id}`);
  }

  updateCustomer(id: number, customer: Customer): Observable<Object> {
    return this.httpClient.put(`${this.updateCustomers}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.deleteCustomers}/${id}`);
  }

  //for User

  private baseUrl = 'http://localhost:8805/user';

  registerUser(user: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/register`, user);
  }

  loginUser(user: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, user);
  }
}
