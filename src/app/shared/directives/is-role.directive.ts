import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Directive({
  selector: '[isRole]'
})
export class IsRoleDirective implements OnInit{
  
  @Input() set isRole(ruoli : any){
    //faccio il parse dei ruoli perche mi arriva una stringa(un lista json ['gatto','cane'])
    ruoli = JSON.parse(ruoli);
    //faccio la chiamata al be per prendere l'utente in sessione con i suoi ruoli
    this.userService.getUserInfo().subscribe(currentUser => {
      //verifico se l'utente è presente e se ha i ruoli
    if (currentUser && currentUser.roles) {
      //faccio la find per verificare se uno dei ruoli in ingresso è presente tra i ruoli dell'utente
      if (!ruoli.find((ruoloInput:any) => currentUser?.roles.includes(ruoloInput))) {
        //se non ne trovo neanche uno non mostro l'elemento
        this.elementRef.nativeElement.style.display = 'none';
      }
    }
    });
  }

  constructor(private elementRef:ElementRef,
    private userService : AuthService) { }

  ngOnInit(): void {
  }
  }




