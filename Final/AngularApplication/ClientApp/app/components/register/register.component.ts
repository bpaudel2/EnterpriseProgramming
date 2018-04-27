import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Todo, todos } from '../todolist/todo.interface';
import { TodoService } from '../todolist/todo.service';
import { User } from '../todolist/user.interface';
import { Warningtime, times } from '../todolist/warningtime.interface';
import { Router } from '@angular/router';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class registerComponent {
    public username: string;
    public password: string;
    public email: string;
    

    public warningtime: Warningtime = {} as any;

    public user: User = {} as any;
    public responseMessageForCreatingUser: any;
    

    public errorMessage: any;
    


    constructor(private todoService: TodoService, private router: Router) {

    }


    public register(): void {
        
        this.user.UserName = this.username;
        this.user.Password = this.password;
        this.user.Email = this.email;
       
        console.log(this.user);

        this.todoService.userregister(this.user).subscribe(
            response =>
            this.responseMessageForCreatingUser = response);
        console.log('result from creating user');
        console.log(this.responseMessageForCreatingUser);
        
    }

     

    

}


