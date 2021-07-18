import { Strategy, ExtractJwt } from 'passport-jwt';
import mongoose from 'mongoose';
// import { PassportStatic } from 'passport';
import config from '../config';

const User = mongoose.model('Users');

const passportOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.keys,
};

const strategy = new Strategy(passportOptions, async (payload, done) => {
  const user = await User.findById(payload.userId).select('login id');

  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

export default strategy;