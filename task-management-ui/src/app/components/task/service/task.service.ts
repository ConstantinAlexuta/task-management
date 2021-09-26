import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task.model';
import { TASK_PATH } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  createTask(task: Task): Observable<Task> {
    let description = task.description;
    let status = task.status;

    var body = {
              "description": "description",
              "status": "description"
        }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'description':  description + "",
        'status':  status + ""
      })
    };

    let params = new HttpParams();
    params.set('description', description + "");
    params.set('status', status + "");

    const options = { params };

    return this.httpClient.post<Task>(TASK_PATH + '/save', body, httpOptions);
  }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(TASK_PATH);
  }

  getTask(taskId: string | number): Observable<Task> {
    return this.httpClient.get<Task>(TASK_PATH + '/' + taskId);
  }

//   updateTask(taskId: string | number, changes: Partial<Task>): Observable<any> {
  updateTask(changes: Partial<Task>): Observable<any> {

    let id = changes.id;
    let description = changes.description;
    let status = changes.status;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'description':  description + "",
        'status':  status + ""
      })
    };

    let params = new HttpParams();
    params.set('description', description + "");
    params.set('status', status + "");

    const options = { params };

//     return this.httpClient.put(TASK_PATH + '/' + taskId, httpOptions);
    return this.httpClient.put(TASK_PATH + '/' + id, httpOptions);
  }

  deleteTask(taskId: string | number): Observable<any> {
    return this.httpClient.delete(TASK_PATH + '/' + taskId);
  }

  deleteAllTasks(): Observable<any> {
    return this.httpClient.delete(TASK_PATH + '/deleteAll');
  }

}
