import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Korisnik, UlogaKorisnika } from "src/modeli/korisnik.model";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const korisnik: Omit<Korisnik, "lozinka"> = request.user;

    if (korisnik.uloga !== UlogaKorisnika.admin) {
      throw new UnauthorizedException({
        message: "nemate privilegije za ovu akciju",
      });
    }

    return true;
  }
}