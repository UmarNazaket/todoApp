import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, createAuthorizationHeader } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  constructor(private httpClient: HttpClient) {}

  URL=BASE_URL;

  addTask(user: {}): Observable<any> {
    return this.httpClient.post(this.URL + '/tasks/addtask',
    { user });
  }

  deleteTask(user: {}): Observable<any> {
    return this.httpClient.delete(this.URL + '/tasks/deletetask',
    {});
  }

  updateTask(user: {}): Observable<any> {
    return this.httpClient.put(this.URL + '/tasks/updatetask',
    { user });
  }

  getTask(userId: string): Observable<any> {
    return this.httpClient.get(this.URL + '/tasks/gettask', {
      params: { userId },
      headers: createAuthorizationHeader()
    });
  }

}
