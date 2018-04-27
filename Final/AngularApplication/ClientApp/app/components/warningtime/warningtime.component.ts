import { Component, OnInit } from '@angular/core';
import { Warningtime,times } from '../todolist/warningtime.interface';
import { TodoService } from '../todolist/todo.service';




@Component({
    selector: 'warning-time',
    templateUrl: './warningtime.component.html',
    styleUrls: ['./warningtime.component.css']
})
export class WarningtimeComponent implements OnInit {
    public warningtime: Warningtime;
    public responseMessage: any;
    public errorMessage: any;
    public editview: boolean = false;
    public editwarningid: number;
    public warning: times = {} as any;
    public errorcreatingwarning: any;


    constructor(private todoService: TodoService) {
    
    }

    ngOnInit(): void {
        this.getwarningtime();
        
    }


    getwarningtime(): void {
        this.todoService.getwarningtime().subscribe(warningtime => {
            this.warningtime= warningtime;
        }, error => this.errorMessage = error);  
        
    }

    


    public editwindow(id: number): void {
        this.editwarningid = id;
        this.editview = true;
        
    }

    
        
}


