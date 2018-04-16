import { Component, OnInit, Input } from '@angular/core';
import { Warningtime } from '../todolist/warningtime.interface';
import { TodoService } from '../todolist/todo.service';
import { Todo, todos } from '../todolist/todo.interface';
import * as moment from 'moment';



@Component({
    selector: 'edit-todo',
    templateUrl: './edittodo.component.html',
    styleUrls: ['./edittodo.component.css']
})
export class EdittodoComponent {
  
    
    
    public responseMessage: any;
    public errorMessage: any;
    
    public updatedtodo: todos = {} as any;
    @Input()
    public todo: todos;
    
  


    constructor(private todoService: TodoService) {
    
    }

    public edittodo() {
        var utcdate = moment(this.todo.date).utc().format("YYYY-MM-DDTHH:mm");
        this.todo.date = utcdate;
        this.updatetodo(this.todo.id, this.todo);
        location.reload();
        console.log(this.responseMessage);
    }
    
    

    public updatetodo(id:number,value: todos): void {
        this.todoService.updatetodo(id, value).subscribe(response =>
            this.responseMessage = response);
        console.log(this.responseMessage);

    }
   
        
}


