import { Request, Response } from "express";
import { Category } from "../entity";

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    return res.json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
    });
  }
};
export const postCategory = async (req: Request, res: Response) => {
  const { category } = req.body;
  try {
    const newCategory = new Category();
    newCategory.category = category;
    await newCategory.save();

    return res.json(newCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
    });
  }
};
export const putCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { category } = req.body;

  try {
    await Category.update({ id: parseInt(id) }, { category });
    return res.json({ ok: true, msg: "Category updated!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
    });
  }
};
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Category.delete({ id: parseInt(id) });

    return res.json({ result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
    });
  }
};
