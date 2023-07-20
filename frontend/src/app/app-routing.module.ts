import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './pages/auth/register-user/register-user.component';
import { LoginUserComponent } from './pages/auth/login-user/login-user.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { AuthGuard } from 'src/shared/auth.guard';

const routes: Routes = [
  {
   path:'',
   component: LoginUserComponent
  },
  {
    path:'register',
    component: RegisterUserComponent
  },
  {
    path: 'todoapp',
    component: TodoListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
