import { app } from "./app.js";
import { connectDB, connectRedis } from "./db/database.js";

const startServer = async () => {
  try {
    console.log("Starting server...");

    await connectDB();
    await connectRedis();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
    process.exit(1);
  }
};

startServer();
