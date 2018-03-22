import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    myForm: FormGroup;

    constructor(private router : Router){}

    onSubmit(){
        if(this.myForm.value.room.trim() && this.myForm.value.name.trim()){
            this.router.navigate(['/chat', this.myForm.value.room.trim(),this.myForm.value.name.trim()]);
        }
        
    }
    ngOnInit() {
        this.myForm = new FormGroup({
            name: new FormControl(null, [
                Validators.required,
            ]),
            room : new FormControl(null, [
                Validators.required,
            ])
        })

    }


}