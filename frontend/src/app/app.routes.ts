import { Routes } from '@angular/router';

import {HomeComponent} from './home/home.component'
import {UserComponent} from './user/user.component'

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'App Home Page',
    },
    {
        path: '/user',
        component: UserComponent,
        title: 'App User Page',
    },
];
