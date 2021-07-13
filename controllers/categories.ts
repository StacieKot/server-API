import { Request, Response } from "express";
import { ICategoty } from "../interfaces";
import { Category } from "../models/Categories";
import cloudinary from "../utils/cloudinary";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const _skip = page ? Number(page) : 0;
    const _limit = limit ? Number(limit) : 0;
    const cursor = Category.collection.find().skip((_skip - 1) * _limit).limit(_limit);
    const categories = {
      count: await cursor.count(),
      data: await cursor.toArray()
    }
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { params, body, file} = req;
    const { image, image_cloudinary_id } = await Category.findById(params.id) as ICategoty;

    if (file) {
      await cloudinary.uploader.destroy(image_cloudinary_id);
    }
    
    const imageResult = file?.path 
      ? await cloudinary.uploader.upload(file.path) 
      : {secure_url: image, public_id: image_cloudinary_id};
  
    const data = {...body, image: imageResult.secure_url, image_cloudinary_id: imageResult.public_id}
    const updatedCategory: ICategoty | null = await Category.findByIdAndUpdate(params.id, data, {new: true,  useFindAndModify: false});
    return res.json(updatedCategory);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { body, file } = req;
    const {secure_url, public_id} = await cloudinary.uploader.upload(file?.path);
    const category = await Category.create({ ...body, image: secure_url, image_cloudinary_id: public_id });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category: ICategoty | null = await Category.findById(id);

    if (category) {
      return res.status(200).send(category);
    }
    res.status(404).send("card not found");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if( deletedCategory ) {
      await cloudinary.uploader.destroy(deletedCategory.image_cloudinary_id);
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
