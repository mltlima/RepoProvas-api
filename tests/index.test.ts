import supertest from 'supertest';

import app from '../src/server.js';
import prisma from '../src/database.js';
import { createUser } from './factories/userFactory.js';

const agent = supertest.agent(app);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

describe('POST /signup', () => {
    const body = {
        email: "test@gmail.com",
        password: "1234",
        confirmPassword: "1234",
    };

    it("valid user", async() => {
        const result = await agent.post("/signup").send(body);
        expect(result.statusCode).toEqual(201);
    });

    it("existing user", async() => {
        await agent.post("/signup").send(body);
        const result = await agent.post("/signup").send(body);
        expect(result.statusCode).toEqual(500);
    });

    it("invalid body", async() => {
        const result = await agent.post("/signup").send({});
        expect(result.statusCode).toEqual(500);
    });
})

describe('POST /signin', () => {
    it("sign in valid user", async() => {
        const user = await createUser();
        const result = await agent.post("/signin").send({
            email: user.email,
            password: user.password,
        });
        expect(result.statusCode).toEqual(200);
    });

    it("invalid user", async() => {
        const body = await agent.post("/signin").send({
            email: "wrong@mail.com",
            password: "1234",
        });
        const result = await agent.post("/signin").send({body});
        expect(result.statusCode).toEqual(500);
    });
})

afterAll(async () => {
    await prisma.$disconnect();
});