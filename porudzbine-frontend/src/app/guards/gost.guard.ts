import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KorisnikService } from '../servisi/korisnik.service';

@Injectable({
  providedIn: 'root'
})
export class GostGuard implements CanActivate {

  constructor(private korisnikService: KorisnikService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const daLiJeGost = this.korisnikService.daLiKorisnikImaUlogu("GOST");

    if(daLiJeGost) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
