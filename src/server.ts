import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import { sendDistractedDrivingAlert } from "./controllers/bot.controller";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/distracted", sendDistractedDrivingAlert);
// app.use(router);
app.get("/", (req, res) => {
  res.send(
    '<h1 style="color:green; text-align:center; margin-top: 300px">Welcome!<br> The Url is working</h1>'
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
