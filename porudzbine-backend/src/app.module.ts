import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
