import { ConfigService } from '@nestjs/config';
import pgp from 'pg-promise';

const pgInit = pgp();

// Vrednost koja ce se koristiti kao token za Dependency injection
// https://docs.nestjs.com/fundamentals/custom-providers#non-class-based-provider-tokens
export const PG_CONNECTION = "PG_CONNECTION";

export const dbProvider = {
  provide: PG_CONNECTION,
  useFactory: (configService: ConfigService) => pgInit({
    password: configService.get("DB_PASSWORD") || "test",
    user: configService.get("DB_USER") || "postgres",
    database: configService.get("DB_NAME") || "porudzbine",
    host: configService.get("DB_HOST") || "localhost",
    port: parseInt(configService.get("DB_PORT")) || 5432
  }),
  inject: [ConfigService]
}
