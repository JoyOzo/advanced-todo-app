import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTodo, Task } from '../interface/createTodo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  private apiUrl = `http://localhost:4000`;

  createTodo(todo: CreateTodo): Observable<{ taskId: number; msg: string; success: boolean }> {
    return this.http.post<{ taskId: number; msg: string; success: boolean }>(
      `${this.apiUrl}/api/task/create`,
      todo,
    );
  }

  getAllTask() {
    return this.http.get<Task[]>(`${this.apiUrl}/api/task/all-tasks`);
  }
}
