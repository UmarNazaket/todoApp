import { Component, OnInit } from '@angular/core';
import { Task } from '../../../shared/model';
import { TaskServiceService } from '../../../shared/services/task-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchQuery: string = '';
  sortKey: string = '';
  isEditTask: boolean = false;
  showAddComponent: boolean = false;
  task!: Task;

  constructor(private taskService: TaskServiceService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    const userId = localStorage.getItem('userId') || '';
    this.taskService.getTask(userId).subscribe({
      next: (response) => {
        this.tasks = response.body;
        this.filteredTasks = response.body;
      },
      error: (e) => {
        console.error('Error fetching tasks:', e);
      },
      complete: () => {}
    }
    );
  }

  searchTasks() {
    if (this.searchQuery.trim() === '') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(task =>
        task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.sortTasks(this.sortKey); // Re-apply sorting after search
  }

  sortTasks(key: string) {
    this.sortKey = key;
    switch (key) {
      case 'priority':
        this.filteredTasks.sort((a, b) => {
          const priorityOrder = ['high', 'medium', 'low'];
          return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
        });
        break;
      case 'dueDate':
        this.filteredTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        break;
      case 'status':
        const statusOrder = ['pending', 'inprogress', 'complete'];
        this.filteredTasks.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
        break;
      default:
        break;
    }
  }


  editTask(task: Task) {
    this.task = task;
    this.isEditTask = true;
    this.showAddComponent = true;
  }

  hideAddComponent(e: boolean){
    this.showAddComponent = false;
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: (response) => {
        console.log(response)
        this.loadTasks();
      },
      error: (e) => {
        console.error('Error deleting task:', e);
      },
      complete: () => {}
    }
    );
  }

  getTaskItemStyle(status: string): object {
    let backgroundColor = '';

    switch (status) {
      case 'complete':
        backgroundColor = '#93f5b8';
        break;
      case 'inprogress':
        backgroundColor = '#75dbfa';
        break;
      case 'pending':
        backgroundColor = '#d98d84';
        break;
      default:
        backgroundColor = '';
        break;
    }

    return {
      'background-color': backgroundColor
    };
  }

}
