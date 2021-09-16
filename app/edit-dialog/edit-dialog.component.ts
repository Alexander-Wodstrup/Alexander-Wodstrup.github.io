import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { Tags } from '../todo.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})

export class EditDialogComponent implements OnInit {
  id = 0;
  title = "";
  description = "";
  status = false;
  duedate: Date = new Date()
  tag = 0
  tags: Tags[] = [
    { value: 0, viewValue: "Frontend" },
    { value: 1, viewValue: "Backend" },
    { value: 2, viewValue: "Administration" },
    { value: 3, viewValue: "Other" }
  ]
  constructor(public dialog: MatDialog, private homeComponent: HomeComponent, @Inject(MAT_DIALOG_DATA) public data: {id: number, title:string, description: string, status: boolean, duedate: Date, tag: number}) { }

  ngOnInit():void {
    this.id = this.data.id
    this.title = this.data.title
    this.description = this.data.description
    this.status = this.data.status
    this.duedate = this.data.duedate
    this.tag = this.data.tag
  }

  setStatusValue(e: any): void {
    this.status = e.checked
  }

  editTask():void {
    this.duedate = new Date(this.duedate)
    const newDate = this.duedate.getTimezoneOffset() * 60000;
    this.duedate = new Date(this.duedate.getTime() - newDate);
    this.homeComponent.editTaskData(this.id, this.title, this.description, this.status, this.duedate, this.tag);
    this.dialog.closeAll();
  }
}
