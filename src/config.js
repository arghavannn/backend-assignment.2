import dotenv from "dotenv";
dotenv.config();

export const {
    DATABASE_URL,
    MAILTRAP_HOST,
    MAILTRAP_PORT,
    MAILTRAP_USER,
    MAILTRAP_PASS,
} = process.env;
