import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-form',
  standalone:false,
  styleUrls: ['./user-form.component.css'],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder,
    private location:Location, private userService: UsersService, private router: Router) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      ownedGames: [[], Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }

  goBack() {
    this.location.back();
    }
}
