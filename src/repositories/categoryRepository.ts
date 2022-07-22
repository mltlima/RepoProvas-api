import prisma from '../database.js';

//get category by name
export async function getCategoryByName(name: string) {
    return prisma.categories.findFirst({
        where: {
            name: name
        }
    });
}