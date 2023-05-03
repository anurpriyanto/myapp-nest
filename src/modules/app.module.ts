import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { MembersModule } from 'src/members/members.module';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/youapp'),MembersModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
