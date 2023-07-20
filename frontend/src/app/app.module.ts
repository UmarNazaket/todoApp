import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { RegisterUserComponent } from './pages/auth/register-user/register-user.component';
import { LoginUserComponent } from './pages/auth/login-user/login-user.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

// Interceptors and pipes
import { ResponseInterceptor } from 'src/shared/interceptors/response.interceptor';
import { TokenInterceptor } from '../shared/interceptors/token.interceptor';
import { FilterTasksPipe } from 'src/shared/pipes/todo-list.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginUserComponent,
    TodoListComponent,
    AddTaskComponent,
    FilterTasksPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
