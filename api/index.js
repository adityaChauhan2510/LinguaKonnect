import { app } from "./app.js";
import { connectDB, connectRedis } from "./data/database.js";

const connectWithRetry = async (connectFunction, name) => {
  while (true) {
    try {
      await connectFunction();
      console.log(`${name} connected successfully.`);
      break;
    } catch (error) {
      console.error(`Failed to connect to ${name}: ${error.message}`);
      console.log(`Retrying ${name} connection in 5 seconds...`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
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
