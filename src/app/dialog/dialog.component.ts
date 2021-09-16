import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { eventService } from '../event.service';
import { Tags, TodoService } from '../todo.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  title = "";
  description = "";
  duedate: Date = new Date()
  tag: number | undefined
  tags: Tags[] = [
    { value: 0, viewValue: "Frontend" },
    { value: 1, viewValue: "Backend" },
    { value: 2, viewValue: "Administration" },
    { value: 3, viewValue: "Other" }
  ]
  constructor(public dialog: MatDialog, public todoService: TodoService, public eventService: eventService) { }

  submitDialog():void {
    console.log(this.tag)
    const newDate = this.duedate.getTimezoneOffset() * 60000;
    this.duedate = new Date(this.duedate.getTime() - newDate);
    if (this.tag == undefined) {
      alert("You need to chose a tag")
    }
    else {
      console.log(this.duedate)
      this.newTodoTask(this.title, this.description, this.duedate, this.tag);
      this.dialog.closeAll();
    }
  }

  newTodoTask(title: string, description: string, duedate: Date, tag:number): void {
    this.todoService.sendData(title, description, duedate, tag).subscribe()
  }
}
