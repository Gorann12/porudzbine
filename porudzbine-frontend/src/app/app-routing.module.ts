import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { GostGuard } from './guards/gost.guard';
import { PrijavaComponent } from './komponente/autentifikacija/prijava/prijava.component';
import { RegistracijaComponent } from './komponente/autentifikacija/registracija/registracija.component';
import { JeloFormaComponent } from './komponente/jelo-forma/jelo-forma.component';
import { MeniComponent } from './komponente/meni/meni.component';

const routes: Routes = [
  { path: '', component: MeniComponent },
  { path: 'prijava', component: PrijavaComponent, canActivate: [GostGuard] },
  { path: 'registracija', component: RegistracijaComponent, canActivate: [GostGuard] },
  { path: 'jelo/kreiraj', component: JeloFormaComponent, canActivate: [AdminGuard] },
  { path: 'jelo/azuriraj/:id', component: JeloFormaComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
