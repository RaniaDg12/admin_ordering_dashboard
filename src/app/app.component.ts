import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from "./components/auth/auth.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HomeComponent } from './components/home/home.component';
import { SitesComponent } from './components/sites/sites.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { UsersComponent } from './components/users/users.component';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    AuthComponent,
    NavbarComponent,
    SidebarComponent, 
    DashboardComponent,
    HomeComponent,
    SitesComponent,
    ArticlesComponent,
    UsersComponent

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
