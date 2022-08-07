import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerModule } from './controller/controller.module';
import { RepositoryModule } from './repository/repository.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RepositoryModule,
    ServiceModule,
    ControllerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
