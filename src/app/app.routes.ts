import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { SitesComponent } from './components/sites/sites.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { UsersComponent } from './components/users/users.component';



export const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'home', component: HomeComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'sites', component: SitesComponent},
    { path: 'articles', component: ArticlesComponent},
    { path: 'users', component: UsersComponent},

];
