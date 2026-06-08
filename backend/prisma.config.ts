import "dotenv/config";
import { defineConfig } from "prisma/config";
import { configService } from "./src/config/config.service";

export default defineConfig({
  schema: "src/prisma/schema.prisma",
  migrations: {
    path: "src/prisma/migrations",
  },
  datasource: {
    url: configService.getValue("DB_URL"),
  },
});
