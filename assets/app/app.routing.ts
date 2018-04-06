import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { ChatComponent } from "./chat/chat.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
// import { AUTH_ROUTES } from "./auth/auth.routes";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/join', pathMatch: 'full' },
    { path: 'join', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent }
    // { path: 'chat/:room/:user', component: ChatComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);