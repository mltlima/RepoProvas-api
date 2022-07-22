import * as testRepository from '../repositories/testRepository.js';

export async function createTest(test: testRepository.Test) {
    const existingTest = await testRepository.checkTest(test);
    if (existingTest)  {
        throw new Error('Test already exists');
    }

    await testRepository.addTest(test);
}