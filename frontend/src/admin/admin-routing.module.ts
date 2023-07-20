import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/auth.guard';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

const routes: Routes = [
  {
   path:'',
   component: UserDetailsComponent,
   canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
