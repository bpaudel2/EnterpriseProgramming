import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Todo, todos } from "./todo.interface";
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Warningtime, times } from "./warningtime.interface";
import { User } from "./user.interface";

@Injectable()
export class TodoService {
    

    constructor(private http: Http) { }

    getTodoList(): Observable<Todo> {
        return this.http.get('/api/todolist/')
            .map(response => response.json() as Todo);
    }
    gettodowithid(id:number): Observable<todos> {
        return this.http.get('api/todolist/' + id)
            .map(response => response.json() as todos);
    }

    
    createtodo(value: todos): Observable<any>{
        return this.http.post('/api/todolist/', value);     
    }

    createwarningtime(value: times): Observable<any> {
        return this.http.post('api/warningtime/', value);
    }
    deletetodo(id:number): Observable<any> {
        return this.http.delete('api/todolist/' + id);
    }
    updatetodo(id: number, value: todos): Observable<any> {
        return this.http.put('api/todolist/' + id, value);
    }
    //took off as Warningtime from this function
    getwarningtime(): Observable<Warningtime> {
        return this.http.get('api/warningtime')
            .map(response => response.json() as Warningtime);
    }

    getwarningtimewithid(id:number): Observable<times> {
        return this.http.get('api/warningtime/'+id)
            .map(response => response.json() as times);
    }

    updatewarningtime(id: number, value: times): Observable<any> {
        
        return this.http.put('api/warningtime/' + id, value);

    }
    
    userlogin(value: User): Observable<any> {
        return this.http.post('/api/user/', value)
            .map(response => response.json());
    }

    userregister(value: User): Observable<any> {
        return this.http.post('/api/user/register', value)
            .map(response => response.json());
    }
}