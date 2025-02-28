import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: UserListComponent },  // List of users
  { path: 'create', component: UserFormComponent },  // Create a new user
  { path: ':id', component: UserDetailsComponent },  // User details
];

@NgModule({
  declarations: [UsersComponent, UserListComponent, UserDetailsComponent, UserFormComponent],
  imports: [FormsModule,
    ReactiveFormsModule,
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
