import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTasks',
  // pure: false
})
export class FilterTasksPipe implements PipeTransform {
  transform(tasks: any[], searchQuery: string): any[] {
    console.log("HELLLO PIPE HERE")
    if (!searchQuery || searchQuery.trim() === '') {
      return tasks;
    }

    const filteredTasks = tasks.filter((task) => {
      const taskTitle = task.title.toLowerCase();
      const taskDescription = task.description.toLowerCase();
      const query = searchQuery.toLowerCase();
      return taskTitle.includes(query) || taskDescription.includes(query);
    });

    return filteredTasks;
  }
}
