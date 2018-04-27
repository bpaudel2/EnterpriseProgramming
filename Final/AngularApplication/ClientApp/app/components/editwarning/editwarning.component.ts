import { Component, OnInit, Input } from '@angular/core';
import { Warningtime } from '../todolist/warningtime.interface';
import { TodoService } from '../todolist/todo.service';
import { times } from '../todolist/warningtime.interface';




@Component({
    selector: 'edit-warning',
    templateUrl: './editwarning.component.html',
    styleUrls: ['./editwarning.component.css']
})
export class EditwarningComponent implements OnInit {
    @Input()
    public id: number;

    public warningtime: times;
    public responseMessage: any;
    public errorMessage: any;
    public day: number;
    public hour: number;
    public updatedwarningtime: times = {} as any;
    
  


    constructor(private todoService: TodoService) {
    
    }

    ngOnInit(): void {
        this.getwarningtimewithid(this.id);

    }

    public updatewarning() {
        this.updatedwarningtime.dayhour = this.day + 'days ' + this.hour + 'hours';
        console.log(this.id);
        console.log(this.updatedwarningtime);
        this.updatewarningtime(this.id, this.updatedwarningtime);
        location.reload();
        console.log(this.responseMessage);
    }
    
    getwarningtimewithid(id: number): void {
        this.todoService.getwarningtimewithid(id).subscribe(warningtime => {
            this.warningtime = warningtime;
        }, error => this.errorMessage = error);
    }

    public updatewarningtime(id:number,value: times): void {
        this.todoService.updatewarningtime(id, value).subscribe(response =>
            this.responseMessage = response);
        console.log(this.responseMessage);

    }
   
        
}


