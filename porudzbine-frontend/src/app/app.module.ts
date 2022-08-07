import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PrijavaComponent } from './komponente/autentifikacija/prijava/prijava.component';
import { RegistracijaComponent } from './komponente/autentifikacija/registracija/registracija.component';
import { OmotacFormeComponent } from './komponente/deljene/omotac-forme/omotac-forme.component';
import { NavbarComponent } from './komponente/navbar/navbar.component';
import { NavbarAdminComponent } from './komponente/navbar/navbar-admin/navbar-admin.component';
import { NavbarKorisnikComponent } from './komponente/navbar/navbar-korisnik/navbar-korisnik.component';
import { NavbarGostComponent } from './komponente/navbar/navbar-gost/navbar-gost.component';
import { KorisnikService } from './servisi/korisnik.service';

import { catchError, Observable, of } from 'rxjs';

function initializeAppFactory(korisnikServis: KorisnikService): () => Observable<any> {
  return () => korisnikServis.inicijalizujKorisnika().pipe(catchError((err) => {
    return of(null);
  }))
}

@NgModule({
  declarations: [
    AppComponent,
    PrijavaComponent,
    RegistracijaComponent,
    OmotacFormeComponent,
    NavbarComponent,
    NavbarAdminComponent,
    NavbarKorisnikComponent,
    NavbarGostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeAppFactory,
    deps: [KorisnikService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
