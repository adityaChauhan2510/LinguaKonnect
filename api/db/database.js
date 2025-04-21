import mongoose from "mongoose";
import pkg from "redis";
const { createClient } = pkg;

let redisClient;

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    const connection = await mongoose.connect(`${MONGO_URI}`, {
      dbName: "backend_db",
    });
    console.log(`Database Connected with ${connection.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    throw new Error("Failed to connect to MongoDB");
  }
};

export const connectRedis = async () => {
  if (!redisClient) {
    redisClient = createClient({
      //password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOSTNAME || "localhost",
        port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
      },
    });

    try {
      await redisClient.connect();
      console.log("Connected to our Redis instance!!");
    } catch (error) {
      console.log("Error connecting to Redis:", error.message);
      throw new Error("Failed to connect to Redis");
    }
  }
};

export const getRedisClient = () => {
  if (!redisClient) {
    throw new Error("Redis client not connected");
  }
  return redisClient;
};
