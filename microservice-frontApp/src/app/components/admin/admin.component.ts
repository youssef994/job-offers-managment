import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/pages/login/_services/app.service';
import {AppAuthService} from 'src/app/pages/login/_services/app-auth.service';
import {AdminService} from './admin.service';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  message: any;
  users: any[] = [];
  selectedRole: string = 'VISITEUR';
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = this.users.length;
  searchValue: string = '';
  filteredUsers: any[] = this.users;

  constructor(private appService: AppService, private appAuthService: AppAuthService, private adminService: AdminService, config: NgbPaginationConfig) {
    config.size = 'sm';
    config.boundaryLinks = true;
  }

  ngOnInit(): void {
    this.fetchUsersByRole(this.selectedRole);
    this.filteredUsers = this.users;

  }

  deleteUser(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.appService.deleteUser(id).subscribe(
          response => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'User has been deleted successfully',
              showConfirmButton: false,
              timer: 1500
            });
            console.log('User deleted successfully', response);
            this.fetchUsersByRole(this.selectedRole); // Refresh list after delete
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
            });
            console.error('Error deleting user', error);
          }
        );
      }
    });
  }


  fetchUsersByRole(role: string): void {
    this.appService.getAllUsersByRole(role).subscribe(data => {
      this.users = data;
      this.filteredUsers = this.users;
      this.collectionSize = this.users.length;
    });
  }

  onSearchChange(value: string): void {
    this.filteredUsers = this.users.filter(user => user.username.includes(value) || user.email.includes(value));
  }

  onRoleChange(event: any): void {
    this.selectedRole = event.target.value;
    this.fetchUsersByRole(this.selectedRole);
  }

  adminAccess() {
    this.appService.adminAccess().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
