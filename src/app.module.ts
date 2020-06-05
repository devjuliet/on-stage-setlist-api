import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { SearchModule } from './modules/search/search.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { ManagerModule } from './modules/manager/manager.module';
import { LedModule } from './modules/led/led.module';
import { BandMembersModule } from './modules/band-members/band-members.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    CatalogsModule,
    SearchModule,
    UploadsModule,
    ManagerModule,
    LedModule,
    BandMembersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
