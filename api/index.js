import { app } from "./app.js";
import { connectDB, connectRedis } from "./data/database.js";

const startServer = async () => {
  while (true) {
    try {
      await connectDB();
      await connectRedis();

      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });

      break;
    } catch (error) {
      console.error("Failed to start server:", error);
      console.log("Retrying in 5 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
};

startServer();
