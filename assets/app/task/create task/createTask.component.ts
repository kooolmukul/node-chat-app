import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../login/login.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from '../task.model';
import { TaskService } from '../task.service';



@Component({

    selector: 'app-createTask',
    templateUrl: './createTask.component.html',
    styleUrls: ['./createTask.component.css'],
    providers : [TaskService]

})

export class CreateTaskComponent implements OnInit {
    myForm: FormGroup;

    constructor(private taskService : TaskService, public dialogRef: MatDialogRef<CreateTaskComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
        ) { }

    public startMin = new Date();
    public endMin = new Date();
    endTime;

    onSubmit(){
        console.log(this.myForm.value);
        const task  = new Task(
            this.myForm.value.taskName, 
            this.myForm.value.description,
            this.myForm.value.startTime,
            this.myForm.value.endTime 
            );
            this.myForm.reset();
            this.taskService.addTask(task).subscribe(
            data =>{
                console.log(data);
            },
            error => console.log(error)
        );  
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


    onDateChange(searchValue ) {
        this.myForm.value.endTime = null;
        this.endTime = null;
        if(searchValue){
            this.endMin = new Date(searchValue);
            this.myForm.controls['endTime'].enable();

        }
        
    }




    ngOnInit() {
        this.myForm = new FormGroup({
            taskName: new FormControl(null, [
                Validators.required,
            ]),
            description: new FormControl(null, [
                Validators.required,
            ]),
            startTime: new FormControl({value : null}, [
                Validators.required,
            ]),
            endTime: new FormControl({value : null,  disabled: true},  [
                Validators.required,
            ])

        })
    }


}