import express from 'express'
import { getCards, updateCard, deleteCard, getCardById, createCard } from '../controllers/cards';
import { upload } from "../utils/multer";

export const cardsRouter = express.Router();

cardsRouter.post('', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), createCard);

cardsRouter.get('', getCards);

cardsRouter.get("/:id", getCardById);

cardsRouter.put("/:id", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), updateCard);

cardsRouter.delete("/:id", deleteCard);

