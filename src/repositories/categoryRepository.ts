import prisma from '../database.js';

//get all categories
export async function getAllCategories() {
    return prisma.categories.findMany();
}