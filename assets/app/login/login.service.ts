import { User } from "./user.model";
import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import * as jwt_decode from "jwt-decode";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
    //private messages: Message[] = [];
    private path: string = "http://localhost:3000";

    UserInfo : User;
    
    constructor( private http : Http ){}

    signUpUser(user : User){

        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.path + '/user', body, {headers: headers})
            .map( (response  : Response) => response.json() )
            .catch( (error : Response) => Observable.throw(error));
    }

    signInUser(user : User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.path + '/user/signin', body, {headers: headers})
            .map( (response  : Response) => response.json() )
            .catch( (error : Response) => Observable.throw(error));
    }

    setUserInfo(){
        var token = localStorage.getItem('token');
        var decoded = jwt_decode(token);
        console.log(decoded);
        this.UserInfo = new User(decoded.user.email,
                                 null,
                                 decoded.user.firstName,
                                 decoded.user.lastName);
          
        console.log(this.UserInfo);
        
    }

    getUserInfo(){
        return this.UserInfo;
    }


    logoutUser(){
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }

}