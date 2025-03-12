import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: UserListComponent },  
  { path: 'create', component: UserFormComponent },  
  { path: 'edit/:id', component: UserFormComponent },  //todo work on that
  { path: ':id', component: UserDetailsComponent },  
];

@NgModule({
  declarations: [UserListComponent, UserDetailsComponent, UserFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
