import { Component, OnInit } from '@angular/core';
import { AutoLogout } from 'src/shared/global';
import { User } from 'src/shared/model';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  users: User[] = [];


  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getUsers()
  }


  getUsers(){
    this.userService.getUsers().subscribe({
      next: (response)=>{
        console.log(response)
        this.users = response.body;
      },
      error: (e) => {
        console.log(e)
      }
    })
  }
  logout(){
    AutoLogout();
  }

}


