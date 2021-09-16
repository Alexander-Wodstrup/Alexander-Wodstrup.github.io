import { Injectable, Output, EventEmitter } from "@angular/core";
import { todo, TodoService } from "./todo.service";
import { Observable } from 'rxjs';

@Injectable()
export class eventService {
    $todoitems = new Observable<todo[]>()

    isLogoutIn = false

    @Output() change: EventEmitter<Observable<todo[]>> = new EventEmitter();

    @Output() logoutChange: EventEmitter<boolean> = new EventEmitter();

    constructor(public todoService: TodoService) {}

    updatedTodoTasks(): void {
        this.change.emit();
    }

    logoutEvent(): void {
        this.logoutChange.emit()
    }
}