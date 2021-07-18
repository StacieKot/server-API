import { Request } from 'express';
import { ICategory, IResponse } from '../interfaces';
import Category from '../models/Categories';
import cloudinary from '../utils/cloudinary';

export const asyncGetCategories = async (req: Request): Promise<IResponse<ICategory>> => {
  const { page, limit } = req.query;
  const _skip = page ? Number(page) : 0;
  const _limit = limit ? Number(limit) : 0;
  const cursor = Category.collection.find().skip((_skip - 1) * _limit).limit(_limit);
  const categories = {
    count: await cursor.count(),
    data: await cursor.toArray(),
  };

  return categories;
};

export const asyncUpdateCategory = async (req: Request): Promise<ICategory | null> => {
  const { params, body, file } = req;
  const { image, image_cloudinary_id } = await Category.findById(params.id) as ICategory;

  if (file && image_cloudinary_id) {
    cloudinary.uploader.destroy(image_cloudinary_id);
  }

  const imageResult = file
    ? await cloudinary.uploader.upload(file.path)
    : { secure_url: image || '', public_id: image_cloudinary_id || '' };

  const data = {
    ...body,
    image: imageResult.secure_url,
    image_cloudinary_id: imageResult.public_id,
  };
  const updatedCategory: ICategory | null = (
    await Category.findByIdAndUpdate(params.id, data, { new: true, useFindAndModify: false })
  );

  return updatedCategory;

};

export const asyncCreateCategory = async (req: Request): Promise<ICategory> => {
  const { body, file } = req;
  const image = file ? await cloudinary.uploader.upload(file?.path) : '';

  const category = await Category.create({
    ...body,
    image: image.secure_url || '',
    image_cloudinary_id: image.public_id || '',
  });
  return category;
};

export const asyncGetCategoryById = async (id : string): Promise<ICategory | null> => {
  const category = await Category.findById(id);
  return category;
};

export const asyncDeleteCategory = async (id : string): Promise<ICategory | null> => {
  const deletedCategory = await Category.findByIdAndDelete(id);
  if (deletedCategory?.image) {
    cloudinary.uploader.destroy(deletedCategory.image_cloudinary_id);
  }

  return deletedCategory;
};
