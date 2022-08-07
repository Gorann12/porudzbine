export interface Korisnik {
  id: number,
  ime: string,
  email: string,
  uloga: UlogaKorisnika
}

export enum UlogaKorisnika {
  korisnik="KORISNIK",
  admin="ADMIN"
}

export interface Kredencijali {
  email: string,
  sifra: string
}

export interface AuthResponse {
  korisnik: Korisnik,
  token: string
}