import { Component, OnInit, signal } from '@angular/core';
import { DatePipe, NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import { TodoService } from '../Services/todo-service';
import { FormsModule, } from '@angular/forms';
import { Task } from '../interface/createTodo';

@Component({
  selector: 'app-todo',
imports: [FormsModule, NgClass, NgStyle, UpperCasePipe, DatePipe],
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
updateTask(task: Task) {
  this.todoService.updateTodo(task.id, {
    taskName: task.taskName,
    dueDate: task.dueDate,
    tags: task.tags,
  }).subscribe({
    next: (res) => {
      console.log('Task updated:', res);
    },
    error: (err) => {
      console.log('Error updating task:', err);
    },
  });
  
}
deleteTask(id: number) {
  this.todoService.deleteTodo(id).subscribe({
    next: (res) => {
      console.log('Task deleted:', res);
      this.getAllTodo();
    },
    error: (err) => {
      console.log('Error deleting task:', err);
    },
  });
}
  ngOnInit(): void {
    this.getAllTodo();
    console.log('dhhdhh');
  }
}
