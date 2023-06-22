import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../global';
import { Observable } from 'rxjs';
import { Task } from '../model';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  constructor(private httpClient: HttpClient) {}

  URL=BASE_URL;

  addTask(task: Task): Observable<any> {
    return this.httpClient.post(this.URL + '/tasks/addtask',
    { task }
    );
  }

  deleteTask(taskId: string): Observable<any> {
    return this.httpClient.delete(this.URL + '/tasks/deletetask', {
    params: { taskId }
    });
  }

  updateTask(task: Task): Observable<any> {
    return this.httpClient.put(this.URL + '/tasks/updatetask',
    { task }
    );
  }

  getTask(userId: string): Observable<any> {
    return this.httpClient.get(this.URL + '/tasks/gettask', {
      params: { userId }
    });
  }

}
