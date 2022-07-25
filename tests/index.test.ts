import supertest from 'supertest';
import { faker } from "@faker-js/faker";

import app from '../src/index.js';
import prisma from '../src/database.js';
import { createUser } from './factories/userFactory.js';
import { generateToken } from './factories/sessionFactory.js';

const agent = supertest.agent(app);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

//Auth tests

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

//Test tests
describe('POST /test', () => {
    it("new test", async() => {
        const user = await createUser();
        const token = await generateToken(1);

        const body = {
            name: "Test title",
            pdfUrl: faker.internet.url(),
            categoryId: 1,
            teacherDisciplineId: 3,
        }

        const result = await agent.post("/test").set("Authorization", `Bearer ${token}`).send(body);
        expect(result.statusCode).toEqual(201);
    });

    it("without token", async() => {
        const body = {
            name: "Test title",
            pdfUrl: faker.internet.url(),
            categoryId: 1,
            teacherDisciplineId: 3,
        }

        const result = await agent.post("/test").send(body);
        expect(result.statusCode).toEqual(500);
    });

    it("invalid test", async() => {
        const user = await createUser();
        const token = await generateToken(1);

        const body = {
            name: "Test title",
            categoryId: 1,
            teacherDisciplineId: 3,
        }

        const result = await agent.post("/test").set("Authorization", `Bearer ${token}`).send(body);
        expect(result.statusCode).toEqual(500);
    });

    it("duplicate test", async() => {
        const user = await createUser();
        const token = await generateToken(1);

        const body = {
            name: "Test title",
            pdfUrl: faker.internet.url(),
            categoryId: 1,
            teacherDisciplineId: 3,
        }

        await agent.post("/test").set("Authorization", `Bearer ${token}`).send(body);
        const result = await agent.post("/test").set("Authorization", `Bearer ${token}`).send(body);
        expect(result.statusCode).toEqual(201);
    })
})

//Get tests
describe('GET /test', () => {
    it("group by disciplines", async() => {
        const user = await createUser();
        const token = await generateToken(1);

        const result = await agent.get("/tests?groupBy=disciplines").set("Authorization", `Bearer ${token}`);
        expect(result.statusCode).toEqual(200);
    });

    it("group by teachers", async() => {
        const user = await createUser();
        const token = await generateToken(1);

        const result = await agent.get("/tests?groupBy=teachers").set("Authorization", `Bearer ${token}`);
        expect(result.statusCode).toEqual(200);
    });

    it("no group by", async() => {
        const user = await createUser();
        const token = await generateToken(1);

        const result = await agent.get("/tests").set("Authorization", `Bearer ${token}`);
        expect(result.statusCode).toEqual(500);
    });
})

afterAll(async () => {
    await prisma.$disconnect();
});