import { Document } from 'mongoose';

export interface Members extends Document {
  username: string;
  email: string;
  password:string;
  createdAt: string;
  profile: any,
  interest:[]
}
