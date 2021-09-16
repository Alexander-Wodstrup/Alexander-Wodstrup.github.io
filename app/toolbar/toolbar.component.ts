import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { eventService } from '../event.service';
import { HomeComponent } from '../home/home.component';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(public dialog: MatDialog, public homeComponent: HomeComponent, public todoService: TodoService, public eventService: eventService) { }

  openNewTaskDialog(): void {
    const dialog = this.dialog.open(DialogComponent);
    dialog.afterClosed().subscribe(() => {
      this.eventService.updatedTodoTasks();
    })
  }

  logout(): void {
    this.eventService.logoutEvent();
  }
}
