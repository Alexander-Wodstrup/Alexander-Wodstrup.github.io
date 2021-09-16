import { Component, OnInit } from '@angular/core';
import { TodoService, todo } from '../todo.service'
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { LoginComponent } from '../login/login.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { eventService } from '../event.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  $todoitems = new Observable<todo[]>()
  todoNotDone: todo[] = [];
  todoDone: todo[] = [];
  constructor(public dialog: MatDialog, private todoService: TodoService, public eventService: eventService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    localStorage.setItem("loginState", "false")
    localStorage.removeItem("token")
    this.eventService.change.subscribe(() => this.update())
    this.eventService.logoutChange.subscribe(() => this.logout())
    if (localStorage.getItem("loginState") == "false") {
      this.openLoginDialog()
    }
    else {
      this.update()
    }
  }

  getFormatedDate(date: Date) : string
  {
    return this.datePipe.transform(date.toString(),"dd/MM/yyyy") || "";
  }

  logout(): void {
    this.todoService.logout()
    this.clearTasks()
    console.log("Logged off")
    this.ngOnInit()
  }

  update(): void {
    this.$todoitems = this.todoService.update()
    this.sortTodoTask(this.$todoitems)
  }

  clearTasks(): void {
    this.$todoitems = of([])
    this.todoNotDone = [];
    this.todoDone = [];
  }

  sortTodoTask(list: Observable<todo[]>): void {
    this.todoNotDone = []
    this.todoDone = []
    list.pipe(map((item: todo[]) => item.map(item => {
      if (item.status == true) {
        this.todoDone.push(item)
      }
      else {
        this.todoNotDone.push(item)
      }
    }))).subscribe()
  }

  openLoginDialog(): void {
    const dialog = this.dialog.open(LoginComponent);
    dialog.disableClose = true;
    dialog.afterClosed().subscribe(() => {
      if (localStorage.getItem("loginState") == "false") {
        this.openLoginDialog()
      }
      else {
        this.update()
      }
    })
  }

  deleteButton(id: number): void {
    this.todoService.deleteData(id).subscribe(() => {
      this.update()
    });
  }

  openEditDialog(id: number, title: string, description: string, status: boolean, duedate: Date, tag: number): void {
    const dialog = this.dialog.open(EditDialogComponent, {
      data: {
        id: id,
        title: title,
        description: description,
        status: status,
        duedate: duedate,
        tag: tag
      }
    });
    dialog.afterClosed().subscribe(() => {
      this.update()
    })
  }

  editTaskData(id: number, title: string, description: string, status: boolean, duedate: Date, tag: number): void {
    this.todoService.putData(id, title, description, status, duedate, tag).subscribe(() => {
      this.update()
    })
  }

  completeTask(id: number, title: string, description: string, duedate: Date, tag: number): void {
    this.editTaskData(id, title, description, true, duedate, tag)
  }

  drop(event: CdkDragDrop<todo[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.previousContainer.data[event.previousIndex].status == true) {
        event.previousContainer.data[event.previousIndex].status = false
        this.editTaskData(event.previousContainer.data[event.previousIndex].id, event.previousContainer.data[event.previousIndex].title, event.previousContainer.data[event.previousIndex].description, event.previousContainer.data[event.previousIndex].status, event.previousContainer.data[event.previousIndex].dueDate, event.previousContainer.data[event.previousIndex].tag)
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
      else {
        event.previousContainer.data[event.previousIndex].status = true
        this.editTaskData(event.previousContainer.data[event.previousIndex].id, event.previousContainer.data[event.previousIndex].title, event.previousContainer.data[event.previousIndex].description, event.previousContainer.data[event.previousIndex].status, event.previousContainer.data[event.previousIndex].dueDate, event.previousContainer.data[event.previousIndex].tag)
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }
  }
}
