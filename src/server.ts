// src/server.ts
import app from "./app/index.js";
import config from "./config/index.js";
import { seedAdmin } from "./seed/seedAdmin.js";

const port = config.port;

app.listen(port, () => {
  console.log(`Server running on port ${port}🚀
        http://localhost:${port}/`);
});

(async function () {
  await seedAdmin();
})();
