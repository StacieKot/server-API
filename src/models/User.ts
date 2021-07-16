import mongoose from 'mongoose';
import { IUser } from '../interfaces';

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<IUser>('Users', UserSchema);

export default User;
