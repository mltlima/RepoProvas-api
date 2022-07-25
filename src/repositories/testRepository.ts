import prisma from '../database.js';
import { disciplines, tests } from "@prisma/client";

export type Test = Omit <tests, 'id' | 'category' | 'teacherDiscipline'>;

export async function addTest(test: Test) {
    return prisma.tests.create({
        data: {
            name: test.name,
            pdfUrl: test.pdfUrl,
            categoryId: test.categoryId,
            teacherDisciplineId: test.teacherDisciplineId
        }
    });
}

export async function getTestbyDiscipline(disciplineId: number) {
    return prisma.tests.findMany({
        where: {
            teacherDisciplineId : disciplineId
        }
    });
}

//get test by category
export async function getTestbyCategory(categoryId: number) {
    return prisma.tests.findMany({
        where: {
            categoryId : categoryId
        }
    });
}

//get test by teacherDisciplineId
export async function getTestbyTeacherDiscipline(teacherDisciplineId: number) {
    return prisma.tests.findMany({
        where: {
            teacherDisciplineId : teacherDisciplineId
        }
    });
}

//check if test is already in database
export async function checkTest(test: Test) {
    return prisma.tests.findMany({
        where: {
            name: test.name,
            pdfUrl: test.pdfUrl,
            categoryId: test.categoryId,
            teacherDisciplineId: test.teacherDisciplineId
        }
    });
}

export async function getTerms() {
    return prisma.terms.findMany({
        orderBy: {
            number: "asc"
        }
    });
}

export async function getTestsGroupbyDisciplines() {
    return prisma.terms.findMany({
        orderBy: {
            number: "asc"
        },
        include: {
            discipline: {
              include: {
                TeacherDiscipline: {
                    include: { 
                        discipline: {}, 
                        teacher: {}, 
                        Test: {}
                    },
                },
              },
            },
          },
    });
}

export async function getTestsGroupbyTeachers(){
    return prisma.teachersDisciplines.findMany({
        include: { 
            teacher: {}, 
            discipline: { 
                include: { 
                    term: {} 
                }
            }, 
                Test: { 
                    include: { 
                        category: {} 
                }}},
    });
}