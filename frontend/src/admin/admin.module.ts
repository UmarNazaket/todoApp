import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

// Primeng
import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule
  ]
})
export class AdminModule { }
