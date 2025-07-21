// env.ts
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_PASSWORD) {
    throw new Error("Missing JWT_PASSWORD in .env");
}

export const JWT_PASSWORD = process.env.JWT_PASSWORD;
