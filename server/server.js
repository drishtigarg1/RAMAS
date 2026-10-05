import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;
const HOST = "0.0.0.0";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, HOST, () => {
      console.log(`🚀 Server running on ${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed");
    process.exit(1);
  }
};

startServer();
