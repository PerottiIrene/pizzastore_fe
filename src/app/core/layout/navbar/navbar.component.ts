import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService:AuthService,private router:Router){}

  logout(){
    this.authService.logout()
   this.backToLogin()
  }

  backToLogin(){
    this.router.navigate(['login'])
  }

  backToWelcome(){
    this.router.navigate(['welcome'])
  }

}
