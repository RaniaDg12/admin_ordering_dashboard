import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateUser, User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NavbarComponent,
    SidebarComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  
  users: User[] = [];
  userForm: FormGroup;
  isSidebarClosed = false;
  user: User | Partial<User> = {};

  isEditing = false;
  currentUserId: string | null = null;
  code: string = '';
  name: string = '';
  appareil: string = '';
  password: string = '';

  constructor(private usersService: UsersService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      appareil: ['', Validators.required],
      password: ['', Validators.required],


    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  handleSidebarToggle(isClosed: boolean): void {
    this.isSidebarClosed = isClosed;
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  openSettingsModal(): void {
    this.name = '';
    this.code = '';
    this.appareil = '';
    this.password = '';
    const settingsModal = new bootstrap.Modal(document.getElementById('settingsModal'), {
      keyboard: false
    });
    settingsModal.show();
  }

  saveUser(): void {
    const newUser: CreateUser = {
      name: this.name,
      code: this.code,
      appareil: this.appareil,
      password: this.password,
    };

    this.usersService.addUser(newUser).subscribe(() => {
      this.loadUsers();
    });

    const settingsModal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));
    settingsModal.hide();
  }

  fetchUsers(): void {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: string): void {
    this.usersService.deleteUser(id).subscribe(() => {
      this.fetchUsers();
    });
  }

  openEditModal(user: User) {
    this.currentUserId = user._id;
    this.name = user.name;
    this.code = user.code;
    this.appareil = user.appareil;

    const editModal = new bootstrap.Modal(document.getElementById('editModal'), {
      keyboard: false
    });
    editModal.show();
  }

  
  updateUser(){
    if (!this.currentUserId) {
      console.error('No User selected for update.');
      return;
    }

    const updatedUser: User = {
      _id: this.currentUserId,
      name: this.name,
      code: this.code,
      appareil: this.appareil,
    };

    this.usersService.updateUser(this.currentUserId, updatedUser).subscribe(() => {
      this.loadUsers();
    });

    const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    editModal.hide();
  }


}
