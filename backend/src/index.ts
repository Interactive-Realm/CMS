import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";
import { authorization } from "./database/cmsDatabase";
import { connectDB, gameData } from "./database/gameDatabase";
import raffleRouter from "./routes/raffleRouter";
import gameRouter from "./routes/gameRouter";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const apiRouter = express.Router();

// Route for authorization
app.post("/authorize", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return; 
  }

  try {
    const organisationId = await authorization(email, password);

    if (organisationId) {
      res.status(200).json({ organisationId });
    } else {
      res.status(401).json({ error: "Invalid email or password." });
    }
  } catch (error) {
    console.error("Error in /authorize route:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Route for authorization
app.post("/data", async (req: Request, res: Response): Promise<void> => {

  try {
    const engagementData = await gameData();
    
    if (engagementData) {
      res.status(200).json({ engagementData });
    } else {
      res.status(401).json({ error: "No data to be send" });
    }
  } catch (error) {
    console.error("Error in /data route:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Routes
apiRouter.use('/raffle', raffleRouter);

app.use("/api", apiRouter);

if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  }).catch((err) => {
    console.error('❌ DB connection failed:', err);
    process.exit(1);
  });
}