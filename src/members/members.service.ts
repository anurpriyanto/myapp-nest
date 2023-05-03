import { HttpException, HttpStatus, Inject, Injectable,UnauthorizedException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Members } from './interfaces/members.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel('Members') private readonly membersModel: Model<Members>,
    private jwtService: JwtService,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Members> {
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(createMemberDto.password, salt);
      const createdMembers = new this.membersModel({
        username: createMemberDto.username,
        email: createMemberDto.email,
        password: hashPassword,
        createdAt: new Date().getTime(),
      });
      return await createdMembers.save();
    } catch (error) {
      throw new HttpException('Error creating members', HttpStatus.BAD_REQUEST);
    }
  }

  async createProfile(createProfileDto: CreateProfileDto, id:String): Promise<Members> {
    try {
      var members = await this.membersModel.findById(id);
      members.profile = createProfileDto
      const memberProfile = new this.membersModel(members)
      return await memberProfile.save();
    } catch (error) {
      throw new HttpException('Error creating members', HttpStatus.BAD_REQUEST);
    }
  }

  async updateProfile(updateProfileDto: UpdateProfileDto, id:String): Promise<Members> {
    try {
      var members = await this.membersModel.findById(id);
      if(updateProfileDto.displayName){
        members.profile = updateProfileDto
      }
      if(updateProfileDto.interest?.length>0){
        members.interest = updateProfileDto.interest
      }
      const memberProfile = new this.membersModel(members)
      return await memberProfile.save();
    } catch (error) {
      console.log(error)
      throw new HttpException('Error creating members', HttpStatus.BAD_REQUEST);
    }
  }

  async signIn(username : string, pass: string) {
    const member = await this.membersModel.findOne({username}).select({ __v: 0 }).exec();//this.usersService.findOne(username);
    const match = await bcrypt.compare(pass, member.password);
    // if (user?.password !== pass) {
    if (!match) {
      throw new UnauthorizedException();
    }
    const payload = { username: member.username, id: member.id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      }),
    };
  }



  findAll() {
    return this.membersModel.find().select({ __v: 0 }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  findByUsername(username: string) {
    return this.membersModel.findOne({username}).select({ __v: 0 }).exec();
  }


  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
