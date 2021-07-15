import express from 'express';
import passport from 'passport';
import {
  createCard, getCards, getCardById, updateCard, deleteCard,
} from '../controllers/cards';
import upload from '../utils/multer';

const cardsRouter = express.Router();

cardsRouter.post('', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), createCard);
cardsRouter.get('', getCards);
cardsRouter.get('/:id', getCardById);
cardsRouter.put('/:id', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), updateCard);
cardsRouter.delete('/:id', passport.authenticate('jwt', { session: false }), deleteCard);

export default cardsRouter;
