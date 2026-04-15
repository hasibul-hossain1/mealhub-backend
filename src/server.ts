// src/server.ts
import app from "./app/index.js";
import config from "./config/index.js";
import { prisma } from "./lib/prisma.js";
import { seedAdmin } from "./seed/seedAdmin.js";

const port = config.port;

async function bootstrap() {
  try {
    await prisma.$connect();
    app.listen(port, () => {
      console.log(`Server running on port ${port}🚀
        http://localhost:${port}/`);
    });
  } catch (error) {
    console.error("DETAILED ERROR:", error);
    process.exit(1);
  }
}

bootstrap();

(async function () {
  await seedAdmin();
})();
