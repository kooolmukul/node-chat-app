import { Task } from "./task.model";
import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import * as jwt_decode from "jwt-decode";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TaskService {
    //private messages: Message[] = [];
    private path: string = "http://localhost:3000";

    tasks : Task[];
    
    constructor( private http : Http ){}

    addTask(task : Task){

        const body = JSON.stringify(task);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.path + '/task', body, {headers: headers})
            .map( (response  : Response) => response.json() )
            .catch( (error : Response) => Observable.throw(error));
    }

    
    getAllTask(){
        return this.http.get(this.path + '/task')
            .map((response : Response) => {
                const tasks = response.json().obj;
                let newTasks : Task[] = [];

                for( let task of tasks){
                    newTasks.push(new Task(task.taskName,task.description, task.startTime,task.endTime));
                }
                this.tasks = newTasks;
                console.log('Sercvice --> '+newTasks);
                return newTasks;
            })
            .catch( (error : Response) => {
                return  Observable.throw(error)
           });
    }

    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }

}