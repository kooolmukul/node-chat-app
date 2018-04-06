import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./login.service";
import { Router } from "@angular/router";
import {User} from './user.model';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    myForm: FormGroup;
    private userInfo;

    constructor(private router : Router, private authService: AuthService){}

    onSubmit() {
        const user  = new User(
            this.myForm.value.email, 
            this.myForm.value.password, 
            );
            this.myForm.reset();
            this.authService.signInUser(user).subscribe(
            data =>{
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                alert('Logged in');
                this.authService.setUserInfo();
                
                this.router.navigateByUrl('/dashboard');
            },
            error => console.log(error)
        );               
        
    }
    


      
    

    ngOnInit() {
        if(this.authService.isLoggedIn()){
            this.router.navigateByUrl('/dashboard');
        }

        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
            ]),
            password : new FormControl(null, [
                Validators.required,
            ])
        })


    }


}