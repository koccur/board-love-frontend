import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotsComponent } from './spots.component';
import { SpotListComponent } from './spot-list/spot-list.component';
import { SpotDetailsComponent } from './spot-details/spot-details.component';
import { SpotFormComponent } from './spot-form/spot-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: SpotListComponent },  // List of spots
  { path: 'create', component: SpotFormComponent },  // Create a new spot
  { path: ':id', component: SpotDetailsComponent },  // Spot details
];

@NgModule({
  declarations: [SpotsComponent, SpotListComponent, SpotDetailsComponent, SpotFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SpotsModule { }
