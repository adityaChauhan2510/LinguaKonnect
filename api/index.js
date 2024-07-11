import { app } from "./app.js";
import { connectDB, connectRedis } from "./db/database.js";

const MAX_RETRIES = 5;
const RETRY_DELAY = 3000; // in milliseconds (3 seconds)

const connectWithRetry = async (connectFunction, name) => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await connectFunction();
      console.log(`${name} connected successfully.`);
      return;
    } catch (error) {
      console.error(
        `Failed to connect to ${name} (attempt ${attempt}): ${error.message}`
      );
      if (attempt < MAX_RETRIES) {
        console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      } else {
        console.error(
          `Could not connect to ${name} after ${MAX_RETRIES} attempts. Exiting...`
        );
        process.exit(1);
      }
    }
  }
};

const startServer = async () => {
  console.log("Starting server...");

  await connectWithRetry(connectDB, "MongoDB");
  await connectWithRetry(connectRedis, "Redis");

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();
