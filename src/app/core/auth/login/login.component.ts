import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Utente } from 'src/app/model/utente';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy{

  utente:Partial<Utente>={
    username:'',
    password: ''
    }

    destroy$:Subject<boolean> =new Subject();

    constructor(private router:Router,private authService:AuthService){}

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete();
  }

  login(loginForm:NgForm){
    if(loginForm.valid)
      this.authService.login(loginForm.value).pipe(
        takeUntil(this.destroy$)).subscribe(res =>{
          this.authService.setUserLogged(res);
       this.router.navigate(['welcome'])
    })
  }

}
