import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import {CandidateComponent} from "../../components/candidat/candidat.component";
import {AuthGuard} from "../../pages/login/_auth/auth.guard";

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },

];
