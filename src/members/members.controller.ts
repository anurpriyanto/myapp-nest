import { Controller, Get, Post, Body, Patch, Param, Delete,Request } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Public } from 'src/auth/constants';
import { LoginMemberDto } from './dto/login-member.dto';
import { AuthService } from 'src/auth/auth.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller()
export class MembersController {
  constructor(
    private readonly membersService: MembersService) {}

  @Public()
  @Post('/register')
  register(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Public()
  @Post('/login')
  login(@Body() loginMemberDto: LoginMemberDto) {
    return this.membersService.signIn(loginMemberDto.username,loginMemberDto.password);
  }

  @Post('/createProfile')
  createProfile(@Body() createProfileDto: CreateProfileDto,@Request() request : any) {
    return this.membersService.createProfile(createProfileDto,request['user'].id);
  }

  @Patch('/updateProfile')
  updateProfile(@Body() updateProfileDto: UpdateProfileDto,@Request() request : any) {
    return this.membersService.updateProfile(updateProfileDto,request['user'].id);
  }

  @Public()
  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }
}
