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
import { MatTableModule } from '@angular/material/table'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatDialogModule } from '@angular/material/dialog'; 

import { PrijavaComponent } from './komponente/autentifikacija/prijava/prijava.component';
import { RegistracijaComponent } from './komponente/autentifikacija/registracija/registracija.component';
import { OmotacFormeComponent } from './komponente/deljene/omotac-forme/omotac-forme.component';
import { NavbarComponent } from './komponente/navbar/navbar.component';
import { NavbarAdminComponent } from './komponente/navbar/navbar-admin/navbar-admin.component';
import { NavbarKorisnikComponent } from './komponente/navbar/navbar-korisnik/navbar-korisnik.component';
import { NavbarGostComponent } from './komponente/navbar/navbar-gost/navbar-gost.component';
import { KorisnikService } from './servisi/korisnik.service';

import { catchError, Observable, of } from 'rxjs';
import { MeniComponent } from './komponente/meni/meni.component';
import { FormatirajStringPipe } from './pipes/formatiraj-string.pipe';
import { JeloFormaComponent } from './komponente/jelo-forma/jelo-forma.component';
import { DialogPotvrdaComponent } from './komponente/deljene/dialog-potvrda/dialog-potvrda.component';

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
    MeniComponent,
    FormatirajStringPipe,
    JeloFormaComponent,
    DialogPotvrdaComponent,
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
    MatProgressSpinnerModule,
    MatTableModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule
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
