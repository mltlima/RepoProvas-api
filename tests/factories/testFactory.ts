import { faker } from "@faker-js/faker";
import prisma from '../../src/database.js';

export async function testFactory() {
    const test = {
        name: faker.system.commonFileName(),
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        teacherDisciplineId: 3,
    }

    await prisma.tests.create({
        data: {
            name: test.name,
            pdfUrl: test.pdfUrl,
            categoryId: test.categoryId,
            teacherDisciplineId: test.teacherDisciplineId,
        },
    });

    return test;
}