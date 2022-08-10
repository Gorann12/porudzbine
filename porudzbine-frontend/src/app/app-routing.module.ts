import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrijavaComponent } from './komponente/autentifikacija/prijava/prijava.component';
import { RegistracijaComponent } from './komponente/autentifikacija/registracija/registracija.component';
import { MeniComponent } from './komponente/meni/meni.component';

const routes: Routes = [
  { path: '', component: MeniComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'registracija', component: RegistracijaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
