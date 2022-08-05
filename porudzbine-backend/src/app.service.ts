import { Injectable } from '@nestjs/common';
import { KorisnikRepository } from './repository/korisnik.repository';


export interface User {
  id: number,
  email: string
}

export interface Post {
  id: number,
  opis?: string,
  naslov: string
}

@Injectable()
export class AppService {

  constructor(private korisnikRepo: KorisnikRepository) {}

  async getUsers() {
    return await this.korisnikRepo.dajKorisnike();
  }

  // async getPosts() {
  //   const upit = 'SELECT * FROM posts';
  //   const postovi = await this.baza.many<Post>(upit);

  //   return postovi;
  // }

  // async kreirajPost(post: Post) {
  //   await this.baza.none("INSERT INTO posts (id, opis, naslov) VALUES ($1, $2, $3)", [post.id, post.opis, post.naslov])
  // }
}
