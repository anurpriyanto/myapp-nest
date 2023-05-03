import * as mongoose from 'mongoose';

// export class Member {}
export const MemberSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: Date,
  profile: {
    displayName: String,
    gender: String,
    birthDay: String,
    horoScope: String,
    zodiac: String,
    height: Number,
    weight: Number,
  },
  interest:[]
});
