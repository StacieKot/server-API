import { Strategy, ExtractJwt } from 'passport-jwt';
import mongoose from 'mongoose';
import { PassportStatic } from 'passport';
import config from '../config';

const User = mongoose.model('Users');

const passportOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.keys,
};

module.exports = (passport : PassportStatic) => {
  passport.use(
    new Strategy(passportOptions, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('login id');

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        throw error;
      }
    }),
  );
};
