import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: "**", redirectTo: "home" },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // if empty path, it redirects to path customers.
  //pathMatch: 'full' ensures that entire URL must match the specified path for the redirection to occur.

  {
    path: 'dashboard',
    canActivate: [AuthGuard], // Apply AuthGuard to the dashboard route and its children
    children: [
      { path: '', component: DashboardComponent },
      { path: 'customers', component: CustomerListComponent },
      { path: 'create-customer', component: CreateCustomerComponent },
    ],
  },

  {
    path: 'customers',
    canActivate: [AuthGuard], //apply AuthGuard to the customer routed and its children
    children: [
      { path: 'update-customer/:id', component: UpdateCustomerComponent },
      { path: 'view-customer/:id', component: ViewCustomerComponent },
    ],
  },

  { path: 'delete-customer/:id', component: DeleteCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
