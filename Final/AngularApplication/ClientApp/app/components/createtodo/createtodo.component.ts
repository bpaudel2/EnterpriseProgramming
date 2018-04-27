import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Todo, todos } from '../todolist/todo.interface';
import { TodoService } from '../todolist/todo.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'create-todo',
    templateUrl: './createtodo.component.html',
    styleUrls: ['./createtodo.component.css']
})
export class CreatetodoComponent {
    public title: string;
    public description: string;
 
    public date: string;
    public tags: string;
    public state: string;
    public utctime: string;
    
    public todo: todos = {} as any;
    public responseMessage: any;
    public createtodoflag: boolean = false;
    



    constructor(private todoService: TodoService, private router: Router) {
      
    }
    

    public createtodo(): void {
        //this.tags.split(',');
        this.utctime = moment(this.date).utc().format("YYYY-MM-DDTHH:mm");
        this.todo.description = this.description;
        this.todo.title = this.title;
        this.todo.date = this.utctime;
        this.todo.state = this.state;
        this.todo.tags = this.tags;
        console.log(this.todo);
        
        this.todoService.createtodo(this.todo).subscribe(response =>
            this.responseMessage = response);
        
        this.createtodoflag = true;
        console.log(this.todo);
    }

    

    public reload(): void {
        console.log('--Response--');
        console.log('This is response', this.responseMessage.toString());
        location.reload();
    }

}


