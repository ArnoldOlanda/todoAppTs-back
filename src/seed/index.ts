import { Router } from "express";
import { Category } from "../entity";

const router = Router();

router.get("/seed", async (_req, res) => {
    try {
        const categories = await Category.find();
        if (categories.length > 0) {
            await Category.remove(categories);
        }

        const categoriesData = [
            "🧑 personal",
            "💼 work",
            "🧺 shop",
            "❤️‍ health",
        ];

        await Promise.all(
            categoriesData.map(async (c) => {
                const category = Category.create({
                    category: c,
                });
                await category.save();
            })
        );

        res.json({
            msg: "Data loaded!",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Contact the adminitrator",
        });
    }
});

export default router;
