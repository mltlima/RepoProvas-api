import prisma from '../database.js';

//get all disciplines
export async function getAllDisciplines() {
    return prisma.disciplines.findMany({
        orderBy: {
            termId: "asc"
        }
    });
}

//get all termIds
export async function getAllTermIds() {
    return prisma.terms.findMany({
        orderBy: {
            number: "asc"
        }
    });
}

//get discipline by termId
export async function getDisciplinebyTermId(termId: number) {
    return prisma.disciplines.findMany({
        where: {
            termId : termId
        }
    });
}