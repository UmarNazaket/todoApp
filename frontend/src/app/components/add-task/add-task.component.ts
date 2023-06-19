import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskServiceService } from 'src/shared/services/task-service.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit, OnChanges {
  taskForm!: FormGroup;
  @Input() isEditTask!: boolean;
  @Input() task!: any;
  @Output() closePopup = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskServiceService
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
      id: [''],
      user: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && changes['task'].currentValue) {
      const currentTask = changes['task'].currentValue;
      if (this.taskForm && this.taskForm.controls) {
        const dueDate = new Date(currentTask.dueDate);
        const formattedDueDate = this.getFormattedDate(dueDate);
        this.taskForm.patchValue({
          title: currentTask.title,
          description: currentTask.description,
          priority: currentTask.priority,
          dueDate: formattedDueDate,
          status: currentTask.status,
          id: currentTask._id,
          user: currentTask.user
        });
      }
    }
    // changes.prop contains the old and the new value...
  }

  ngOnInit() {
  }

  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      // Handle form submission and add task logic here
      let taskData = this.taskForm.value;
      taskData.user = localStorage.getItem('userId')
      if (this.isEditTask) {
        this.taskService.updateTask(this.taskForm.value).subscribe({
          next: (response) => {
            console.log(response);
            this.closePopup.emit(true)
          },
          error: (e) => console.error(e),
          complete: () => {
            this.taskForm.reset();
          },
        });
      } else {
        this.taskService.addTask(this.taskForm.value).subscribe({
          next: (response) => {
            this.closePopup.emit(true)
          },
          error: (e) => console.error(e),
          complete: () => {
            this.taskForm.reset();
          },
        });
      }
    } else {
      // Mark all form fields as touched to display validation messages
      this.markAllFieldsAsTouched();
    }
  }

  markAllFieldsAsTouched() {
    Object.keys(this.taskForm.controls).forEach((field) => {
      const control = this.taskForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }
}
