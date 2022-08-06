export interface Korisnik {
  id: number,
  ime: string,
  email: string,
  sifra: string,
  uloga: UlogaKorisnika
}

export enum UlogaKorisnika {
  admin="ADMIN",
  korisnik="KORISNIK"
}