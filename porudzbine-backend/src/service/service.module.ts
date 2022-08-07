import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { RepositoryModule } from "src/repository/repository.module";
import { AuthJwtStrategy } from "src/strategy/auth-jwt.strategy";
import { KorisnikService } from "./korisnik.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') || 'testsecret'
      }),
      inject: [ConfigService],
    }),
    RepositoryModule
  ],
  providers: [KorisnikService, AuthJwtStrategy],
  exports: [KorisnikService],
})
export class ServiceModule {}