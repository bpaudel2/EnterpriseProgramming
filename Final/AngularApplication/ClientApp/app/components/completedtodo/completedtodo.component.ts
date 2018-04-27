import { Component, OnInit } from '@angular/core';
import { Todo } from '../todolist/todo.interface';
import { TodoService } from '../todolist/todo.service';
import * as moment from 'moment';



@Component({
    selector: 'completed-todo',
    templateUrl: './completedtodo.component.html',
    styleUrls: ['./completedtodo.component.css']
})
export class CompletedTodoComponent implements OnInit {
    public todolist: Todo;
    public responseMessage: any;
    public errorMessage: any;
  


    constructor(private todoService: TodoService) {
    
    }

    ngOnInit(): void {
        this.getTodoList();

    }


    getTodoList(): void {
        this.todoService.getTodoList().subscribe(todo => {
            this.todolist = todo;
        }, error => this.errorMessage = error);
           
    }
    public removetodo(id: number) {
        this.deletetodo(id);
        location.reload();
    }
    public deletetodo(id:number): void {
        this.todoService.deletetodo(id).subscribe(response =>
            this.responseMessage = response);
    }

    public getlocaltime(date: string) {
        return moment.utc(date).local().format("dddd, MMMM Do YYYY, h:mm a");
    }
}


