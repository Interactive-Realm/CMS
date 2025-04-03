import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";
import { authorization } from "./database/cmsDatabase";
import { connectDB, gameData } from "./database/gameDatabase";
import raffleRouter from "./routes/raffleRouter";
import gameRouter from "./routes/gameRouter";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

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
apiRouter.use("/game", gameRouter);
apiRouter.use('/raffle', raffleRouter);

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  connectDB();
});
