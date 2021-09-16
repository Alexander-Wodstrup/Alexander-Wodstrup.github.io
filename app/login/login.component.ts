import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoService, User } from '../todo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = ""
  password = ""
  constructor(public dialog: MatDialog, public todoService: TodoService) { }

  submitDialog(): void {
    this.login(this.email, this.password, this.dialog)
  }

  login(email: string, password: string, dialog: MatDialog): void {
    const user = new User("","",email,password)
    this.todoService.login(user).subscribe(res => {
      localStorage.setItem("token", res.jwt)
      localStorage.setItem("loginState", "true")
      dialog.closeAll()
    })
  }
}
