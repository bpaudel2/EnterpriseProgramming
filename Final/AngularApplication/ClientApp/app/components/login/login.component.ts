import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Todo, todos } from '../todolist/todo.interface';
import { TodoService } from '../todolist/todo.service';
import { User } from '../todolist/user.interface';
import { Router } from '@angular/router';
import { Warningtime,times } from '../todolist/warningtime.interface';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class loginComponent {
    public username: string;
    public password: string;
    public warning: times = {} as any;
    public warningtime: Warningtime;
    public user: User = {} as any;
    public responseMessage: any;
    public createwarningflag: boolean = false;
    public errorMessage: any;
    public errorcreatingwarning: any;
    constructor(private todoService: TodoService, private router: Router) {

    }


    public login(): void {
        this.createwarningflag = true;
        this.user.UserName = this.username;
        this.user.Password = this.password;
       
        console.log(this.user);

        this.todoService.userlogin(this.user).subscribe(response =>
            this.responseMessage = response);
        if (this.responseMessage) {
            console.log(this.responseMessage);
        }
        
    }

    public getwarningtime(): void {
        this.todoService.getwarningtime().subscribe(warningtime => {
            this.warningtime = warningtime;
        }, error => this.errorMessage = error);
        console.log("Getting warning time");

    }

    public initiatewarningtime(): void {
        if (this.createwarningflag) {
            this.initiatewarningtime = function () { };
            console.log("ONLY ONE TIME----------");
            this.warning.dayhour = "2days 0hours";
            this.todoService.createwarningtime(this.warning).subscribe(response =>
                this.errorcreatingwarning = response);
            console.log('TIME CREATED');

        }



    }

    public redirecttotodo(): void {
        
       this.router.navigate(['/todolist']);
    }



   

}


