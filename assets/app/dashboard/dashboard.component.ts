import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/login.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateTaskComponent } from '../task/create task/createTask.component';
import { TaskService } from '../task/task.service';
import { Task } from '../task/task.model';
import { resolve6 } from 'dns';



@Component({

    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']

})

export class DashboardComponent implements OnInit {
    constructor(private taskService: TaskService, private authService: AuthService, private router: Router, public dialog: MatDialog) { }


    tasks: Task[];

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/');
        }

        this.taskService.getAllTask()
            .subscribe(
                (tasks: Task[]) => {
                    this.tasks = tasks;
                    console.log(this.tasks);
                }
            )

    }

    dateTimeformat(dateTime){
        dateTime = new Date(dateTime);
        var dateString = dateTime.toLocaleDateString('en-GB', { hour12: true });
        var timeString = dateTime.toLocaleTimeString();
        var dateTimeObj = {
            date : dateString,
            time : timeString
        }
        return dateTimeObj;
    }


    openDialog(): void {
        let dialogRef = this.dialog.open(CreateTaskComponent, {
            width: '600px',
            
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                const task = new Task(result.taskName, result.description, result.startTime, result.endTime);
                this.tasks.push(task);
            }

        });

    }

    getAllTasks() {

    }

   


}