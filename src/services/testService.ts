import * as testRepository from '../repositories/testRepository.js';

export async function createTest(test: testRepository.Test) {
    const existingTest = await testRepository.checkTest(test);
    if (existingTest)  {
        throw new Error('Test already exists');
    }

    await testRepository.addTest(test);
}

export async function getTests(groupBy: string) {
    groupBy = JSON.parse(groupBy);

    if (groupBy === 'disciplines') {
        return await testRepository.getTestsGroupbyDisciplines();
    } else if (groupBy === 'teachers') {
        return await testRepository.getTestsGroupbyTeachers();
    }
    throw new Error('Invalid groupBy');
}