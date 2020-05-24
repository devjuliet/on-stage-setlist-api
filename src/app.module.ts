import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { SearchModule } from './modules/search/search.module';
import { UploadsModule } from './modules/uploads/uploads.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, CatalogsModule,SearchModule, UploadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
