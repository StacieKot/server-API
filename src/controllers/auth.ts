import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/User';
import config from '../config';

export const basiclogin = async (req : Request, res: Response) : Promise<void> => {
  const { login, password } = req.body;
  const candidate = await User.findOne({ login });

  if (candidate) {
    const passResult = bcrypt.compareSync(password, candidate.password);

    if (passResult) {
      const token = jwt.sign({
        login,
        userId: candidate._id,
      }, config.keys, { expiresIn: 60 * 180 });
      
      res.status(200).json({ token });
    } else {
      res.status(401);
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const register = async (req : Request, res: Response) : Promise<void> => {
  const { login, password } = req.body;
  console.log(req.body)
  const candidate = await User.findOne({ login });

  if (candidate) {
    res.status(409).json({ message: 'User with this name exists' });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const user = new User({ login, password: bcrypt.hashSync(password, salt) });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500);
    }
  }
};
