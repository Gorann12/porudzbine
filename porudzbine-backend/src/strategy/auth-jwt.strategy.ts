import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { KorisnikRepository } from "src/repository/korisnik.repository";

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  
  constructor(private korisnikRepo: KorisnikRepository, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get("JWT_SECRET") || "testsecret"
    })
  }

  async validate(payload: { id: number }) {
    const korisnik = await this.korisnikRepo.dajKorisnikaPoId(payload.id);

    if(!korisnik) {
      throw new UnauthorizedException('Morate biti ulogovani da biste izvrsili ovu akciju!')
    }

    return korisnik;
  }
}