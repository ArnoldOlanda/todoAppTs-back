"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.putCategory = exports.postCategory = exports.getCategories = void 0;
const entity_1 = require("../entity");
const getCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield entity_1.Category.find();
        return res.json(categories);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
        });
    }
});
exports.getCategories = getCategories;
const postCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.body;
    try {
        const newCategory = new entity_1.Category();
        newCategory.category = category;
        yield newCategory.save();
        return res.json(newCategory);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
        });
    }
});
exports.postCategory = postCategory;
const putCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { category } = req.body;
    try {
        yield entity_1.Category.update({ id: parseInt(id) }, { category });
        return res.json({ ok: true, msg: "Category updated!" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
        });
    }
});
exports.putCategory = putCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield entity_1.Category.delete({ id: parseInt(id) });
        return res.json({ result });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
        });
    }
});
exports.deleteCategory = deleteCategory;
