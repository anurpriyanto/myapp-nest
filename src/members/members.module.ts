import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema } from './entities/member.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Members', schema: MemberSchema }])],
  controllers: [MembersController],
  providers: [MembersService],
  exports:[MembersService]
})
export class MembersModule {}
