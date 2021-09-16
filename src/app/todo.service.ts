import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    $todoitems = new Observable<todo[]>()
    constructor(private http: HttpClient) { }

    update(): Observable<todo[]> {
        this.$todoitems = this.getData()
        return this.$todoitems
    }

    getData():Observable<todo[]> {
        const url = "https://localhost:44355/api/Todo"
        const headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
        return this.http.get<todo[]>(url, { headers: headers_object });
    }

    sendData(title: string, description: string, dueDate: Date, tag:number):Observable<todo[]> {
        const newTask = new todo(0, title, description, false, dueDate, tag);
        const url = "https://localhost:44355/api/Todo"
        const headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
        return this.http.post<todo[]>(url, newTask, { headers: headers_object })
    }

    deleteData(id: number):Observable<todo[]> {
        const url = "https://localhost:44355/api/Todo/" + id;
        const headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
        return this.http.delete<todo[]>(url, { headers: headers_object })
    }

    putData(id:number, title:string, description:string, status:boolean, dueDate:Date, tag:number):Observable<todo[]> {
        const url = "https://localhost:44355/api/Todo/" + id;
        const testTask = new todo(id, title, description, status, dueDate, tag)
        const headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
        return this.http.put<todo[]>(url, testTask, { headers: headers_object })
    }

    login(user:User):Observable<Token> {
        const url = "https://localhost:44355/Account/login/"
        return this.http.post<Token>(url, user)
    }

    logout(): void {
        localStorage.removeItem("token");
        localStorage.setItem("loginState", "false");
    }
}

export class todo {
    constructor(public id: number, public title: string, public description: string, public status: boolean, public dueDate: Date, public tag: number) { }
}

export class User {
    constructor(public firstname: string, public lastname: string, public email: string, private password: string) { }
}

export class Token {
    constructor(public jwt: string) { }
}

export class Tags {
    constructor(public value: number, public viewValue: string) { }
}