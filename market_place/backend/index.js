const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

dotenv.config(); // Load config

async function connect(){
  await connectDB();
}
connect()

// MIDDLEWARE
app.use(express.json());

// allow CORS for local development (for production, you should configure it properly)
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// ROUTESs
const productRoutes = require("./routes/products.route");
app.use("/api/products", productRoutes);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
