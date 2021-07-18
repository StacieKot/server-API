import { ICategory, IResponse } from '../interfaces';
import Category from '../models/Categories';
import cloudinary from '../utils/cloudinary';

export const asyncGetCategories = async (
  page: string,
  limit: string,
): Promise<IResponse<ICategory>> => {
  const _skip = page ? Number(page) : 0;
  const _limit = limit ? Number(limit) : 0;
  const cursor = Category.collection.find().skip((_skip - 1) * _limit).limit(_limit);
  const categories = {
    count: await cursor.count(),
    data: await cursor.toArray(),
  };

  return categories;
};

export const asyncCreateCategory = async (
  body: ICategory,
  file: Express.Multer.File | undefined,
): Promise<ICategory> => {
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
  if (deletedCategory && deletedCategory.image) {
    cloudinary.uploader.destroy(deletedCategory.image_cloudinary_id);
  }

  return deletedCategory;
};

export const asyncUpdateCategory = async (
  id: string,
  body: ICategory,
  file: Express.Multer.File | undefined,
): Promise<ICategory | null> => {
  const { image, image_cloudinary_id } = await Category.findById(id) as ICategory;

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
    await Category.findByIdAndUpdate(id, data, { new: true, useFindAndModify: false })
  );

  return updatedCategory;
};
