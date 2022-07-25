import jwt from "jsonwebtoken";

export async function generateToken(id: number) {
    const token = jwt.sign({
        id
    }, process.env.JWT_TOKEN!);

    return token;
}