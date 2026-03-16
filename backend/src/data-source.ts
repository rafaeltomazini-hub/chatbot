import "reflect-metadata";
import { DataSource } from "typeorm";
import { User, Question } from "./entity";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE || "chatbot_db",
    synchronize: true, // Only for development! Creates tables automatically.
    logging: false,
    entities: [User, Question],
    migrations: [],
    subscribers: [],
});
