import { configService } from "@/config/config.service";
import { Client } from "pg";

async function createDatabase() {
    const client = new Client({
        host: configService.getValue("DB_HOST"),
        port: Number(configService.getValue("DB_PORT")),
        user: configService.getValue("DB_USERNAME"),
        password: configService.getValue("DB_PASSWORD"),
        ssl: { rejectUnauthorized: false },
        database: "postgres", // assuming postgres is an existing database
    });

    await client.connect();

    const dbName = configService.getValue("DB_NAME");

    if (!/^[a-zA-Z0-9_]+$/.test(dbName)) {
        throw new Error("Invalid database name");
    }

    const result = await client.query(
        `SELECT 1 FROM pg_database WHERE datname = $1`,
        [dbName]
    );

    if (result.rowCount === 0) {
        await client.query(`CREATE DATABASE ${dbName}`);
        console.log(`Database ${dbName} created`);
    } else {
        console.log(`Database ${dbName} already exists`);
    }

    await client.end();
}

createDatabase();