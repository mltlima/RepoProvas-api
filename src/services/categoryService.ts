import * as categoryRepository from "../repositories/categoryRepository.js";

const validCategoryNames = ["P1", "P2", "P3", "P2ch", "Outras"];

export async function getCategoryByName(name: string) {
    if (!validCategoryNames.includes(name)) {
        throw new Error("Invalid category name");
    }
    return categoryRepository.getCategoryByName(name);
}