import { app } from "./app.js";
import { connectDB, connectRedis } from "./data/database.js";

const connectOnce = async (connectFunction, name) => {
  try {
    await connectFunction();
    console.log(`${name} connected successfully.`);
  } catch (error) {
    console.error(`Failed to connect to ${name}: ${error.message}`);
  }
};

const startServer = async () => {
  console.log("Starting server...");

  await connectOnce(connectDB, "MongoDB");
  await connectOnce(connectRedis, "Redis");

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();
