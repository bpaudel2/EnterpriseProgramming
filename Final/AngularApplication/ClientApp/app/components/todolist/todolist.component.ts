import { Component, OnInit } from '@angular/core';
import { TodoService} from './todo.service';
import { Todo, todos } from './todo.interface';
import { Warningtime, times } from './warningtime.interface';
import * as moment from 'moment';



@Component({
    selector: 'todo-list',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
    public todolist: Todo;
    public sortedtodolist: todos[];
    public filteredtodolist: todos[];
    public errorMessage: any;
    public editview: boolean = false;
    public todo: todos;
    public warningtime: Warningtime;
    public warning: times;
    public sortingcriteria: string;
    public sortingorder: string;
    public filterstring: string;
    public mode: string ='normal';
    public errorwarningtime: any;
  


    constructor(private todoService: TodoService) {
    
    }

    ngOnInit(): void {
        this.getTodoList();
        this.getwarningtime();
        this.editview = false;
    }


    getTodoList():void {
        this.todoService.getTodoList().subscribe(todo => {
            this.todolist = todo;  
        }, error => this.errorMessage = error);   
        console.log("Getting TodoList");
      
    }

   
    public getwarningtime(): void {
        this.todoService.getwarningtime().subscribe(warningtime => {
            this.warningtime = warningtime;
        }, error => this.errorwarningtime = error);
        console.log(this.todolist);
        
    }
    public editwindow(id: number): void {
        this.editview = false;
        this.gettodowithid(id);
        this.editview = true;
       
    }

    public gettodowithid(id: number): void {
        this.todoService.gettodowithid(id).subscribe(todo => {
            this.todo = todo;
        }, error => this.errorMessage = error);
        
    }

    public getstyle(date: string, warning: string) {
        var numberofdays = +warning.slice(0, warning.indexOf('d'));
        var numberofhours = +warning.slice(warning.indexOf('s') + 1, warning.indexOf('h'));
        
        var addedwarningtime = moment.utc(Date.now()).add({days:numberofdays, hours:numberofhours}).toString();
        
        var utctime = moment.utc().toString();
        
        var momentutcdate = moment.utc(date);
        
        if (moment.utc(utctime).isAfter(momentutcdate)) {
           
            return "red";
        } else if (moment.utc(addedwarningtime).isAfter(momentutcdate)) {
            
            return "yellow";
        } else {
           
            return " ";
        }
    }

    public getlocaltime(date: string) {
        return moment.utc(date).local().format("dddd, MMMM Do YYYY, h:mm a");
    }

    public sortmode(): void {
        this.mode = 'sort';
        console.log(this.sortingcriteria);
        console.log(this.sortingorder);

    }
    public filtermode(): void {
        this.mode = 'filter';
        console.log(this.filterstring);
    }
    public sorttodo(todolist: todos[]) {
        console.log(todolist);
        if (this.sortingcriteria == 'Alphabetically' && this.sortingorder == 'ASC') {
            todolist.sort(function (a, b) {
                return a.title.toLowerCase().localeCompare(b.title.toLowerCase());

            });
            this.sortedtodolist = todolist;
        }
        else if (this.sortingcriteria == 'Alphabetically' && this.sortingorder == 'DSC') {
            todolist.sort(function (a, b) {
                return a.title.toLowerCase().localeCompare(b.title.toLowerCase());

            });

            this.sortedtodolist = todolist.reverse();
        }
        else if (this.sortingcriteria == 'Due Date' && this.sortingorder == 'DSC') {
            todolist.sort(function (a, b) {
                if (moment(a.date).isAfter(moment(b.date))) {
                    return -1;
                } else {
                    return 1;;
                }
            });
            this.sortedtodolist = todolist;
        }
        else if (this.sortingcriteria == 'Due Date' && this.sortingorder == 'ASC') {
            todolist.sort(function (a, b) {
                if (moment(a.date).isAfter(moment(b.date))) {
                    return -1;
                } else {
                    return 1;;
                }
            });
            this.sortedtodolist = todolist.reverse();
        }
    }
    public filtertodo(todolist: todos[]) {
        var tempresult: todos[]=[];
        var filtertextarray = this.filterstring.split(',');
        console.log(filtertextarray);
        for (var i = 0; i < todolist.length; i++) {
            var tags = [];
            
            tags = todolist[i].tags.split(',');
            console.log(tags);
            if (this.arrayContainsArray(tags,filtertextarray)) {
                tempresult.push(todolist[i]);
            }
        }
        this.filteredtodolist = tempresult;
        console.log(this.filteredtodolist);

    }
    public commonElements(arr1:string[], arr2:string[]) {

    return arr1.some(function (el) {
        return arr2.indexOf(el) > -1;
        });

    }
    public arrayContainsArray(superset:string[], subset:string[]) {
    if (0 === subset.length) {
        return false;
    }
    return subset.every(function (value) {
        return (superset.indexOf(value) >= 0);
    });
}
}


