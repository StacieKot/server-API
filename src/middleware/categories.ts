import { Request, Response } from 'express';
import {
  asyncCreateCategory,
  asyncGetCategories,
  asyncUpdateCategory,
  asyncGetCategoryById,
  asyncDeleteCategory,
} from '../controllers/categories';

export const getCategories = async (req : Request, res: Response) : Promise<void> => {
  try {
    const { page, limit } = req.query;
    const categories = await asyncGetCategories(page as string, limit as string);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createCategory = async (req : Request, res: Response) : Promise<void> => {
  try {
    const { body, file } = req;
    const category = await asyncCreateCategory(body, file);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateCategory = async (req : Request, res: Response) : Promise<void> => {
  try {
    const { params, body, file } = req;
    const { id } = params;
    const updatedCategory = await asyncUpdateCategory(id, body, file);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCategoryById = async (req : Request, res: Response) : Promise<void> => {
  try {
    const { id } = req.params;
    const category = await asyncGetCategoryById(id);
    if (category) {
      res.status(200).json(category);
    }
    res.status(404).send('card not found');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteCategory = async (req : Request, res: Response) : Promise<void> => {
  try {
    const { id } = req.params;
    const deletedCategory = await asyncDeleteCategory(id);
    if (deletedCategory) {
      res.sendStatus(204);
    } else {
      res.status(404).send('category not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
