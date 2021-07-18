import { Request, Response } from 'express';
import { asyncCreateCategory, asyncGetCategories, asyncUpdateCategory, asyncGetCategoryById, asyncDeleteCategory } from '../controllers/categories';

export const getCategories = async (req : Request, res: Response) : Promise<void> => {
  try {
    const categories = await asyncGetCategories(req)
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createCategory = async (req : Request, res: Response) : Promise<void> => {
  try {
    const category = await asyncCreateCategory(req)
    res.status(200).json(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateCategory = async (req : Request, res: Response) : Promise<void> => {
  try {
    const updatedCategory = await asyncUpdateCategory(req)
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCategoryById = async (req : Request, res: Response) : Promise<void> => {
  try {
    const { id } = req.params;
    const category = await asyncGetCategoryById(id)
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
      res.sendStatus(204)
    } else {
      res.status(404).send('category not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};