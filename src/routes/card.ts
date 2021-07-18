import express from 'express';
import passport from 'passport';
import {
  deleteCard,
  getCardById,
  getCards,
  updateCard,
  сreateCard,
} from '../middleware/cards';
import upload from '../utils/multer';

const cardsRouter = express.Router();

cardsRouter.post('', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), сreateCard);
cardsRouter.get('', getCards);
cardsRouter.get('/:id', getCardById);
cardsRouter.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), updateCard);
cardsRouter.delete('/:id', passport.authenticate('jwt', { session: false }), deleteCard);

export default cardsRouter;
