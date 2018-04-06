import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import {MatButtonModule, MatDialogModule,MatCardModule,
        MatFormFieldModule,MatInputModule,MatIconModule,
        MatDatepickerModule,MatGridListModule,MatChipsModule} from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';



import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ChatComponent } from "./chat/chat.component";
import { LoginComponent } from "./login/login.component";
import { CreateTaskComponent } from "./task/create task/createTask.component";
import { CountdownComponent } from "./countdown-timer/countdown.component";
import { routing } from "./app.routing";


@NgModule({
    declarations: [
        AppComponent, ChatComponent,LoginComponent, DashboardComponent,CreateTaskComponent,CountdownComponent
    ],
    imports: [BrowserModule,FormsModule, 
        ReactiveFormsModule, routing ,BrowserAnimationsModule,HttpModule,
        MatButtonModule,MatDialogModule,MatCardModule,MatInputModule,
        MatFormFieldModule,OwlDateTimeModule, OwlNativeDateTimeModule,
        MatIconModule,MatDatepickerModule,MatGridListModule,MatChipsModule],
    entryComponents: [CreateTaskComponent] ,   
    
    schemas: [ NO_ERRORS_SCHEMA ],    
    bootstrap: [AppComponent]
})
export class AppModule {

}