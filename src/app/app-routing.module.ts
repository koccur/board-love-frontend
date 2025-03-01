import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports:[RouterModule]
})
export class AppRoutingModule{
  
}