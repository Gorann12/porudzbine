import { Inject, Injectable } from '@nestjs/common';
import { IDatabase, } from 'pg-promise';
import { PG_CONNECTION } from './database/database.module';

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
  // TODO: REMOVE THIS INJECTION, IT WILL BE USED IN
  // A DIFFERENT PLACE
  constructor(@Inject(PG_CONNECTION) private baza: IDatabase<any>) {}

  async getUsers() {
    const upit = 'SELECT * FROM users';
    const korisnici = await this.baza.many<User>(upit);

    return korisnici;
  }

  async getPosts() {
    const upit = 'SELECT * FROM posts';
    const postovi = await this.baza.many<Post>(upit);

    return postovi;
  }

  async kreirajPost(post: Post) {
    await this.baza.none("INSERT INTO posts (id, opis, naslov) VALUES ($1, $2, $3)", [post.id, post.opis, post.naslov])
  }
}
