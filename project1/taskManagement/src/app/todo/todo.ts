import { Component, OnInit, signal } from '@angular/core';
import { TodoService } from '../Services/todo-service';
import { FormsModule } from '@angular/forms';
import { Task } from '../interface/createTodo';

@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo implements OnInit {
  constructor(private todoService: TodoService) {}
  taskName = '';
  dueDate = '';
  tagsRaw = '';
  tasks = signal<Task[]>([]);
  addTodo() {
    this.todoService
      .createTodo({
        taskName: this.taskName,
        dueDate: new Date(this.dueDate).toISOString(),
        tags: this.tagsRaw.split(','),
      })
      .subscribe({
        next: (res) => {
          console.log(this.tasks());
        },
      });
  }
  getAllTodo() {
    console.log(this.todoService.getAllTask());
    this.todoService.getAllTask().subscribe({
      next: (res) => {
        console.log(res);
        this.tasks.set(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  ngOnInit(): void {
    this.getAllTodo();
    console.log('dhhdhh');
  }
}
