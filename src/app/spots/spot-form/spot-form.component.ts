import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpotService } from '../spots.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-spot-form',
  standalone: false,
  templateUrl: './spot-form.component.html',
  styleUrl: './spot-form.component.scss'
})
export class SpotFormComponent {
  spotForm: FormGroup;

  constructor(private fb: FormBuilder,
    private location:Location, private spotService: SpotService, private router: Router) {
    this.spotForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.spotForm.valid) {
      this.spotService.createSpot(this.spotForm.value).subscribe(() => {
        this.router.navigate(['/spots']);
      });
    }
  }
  goBack() {
    this.location.back();
    }
}
