const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
dotenv.config();

const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const officeRoutes = require("./routes/officeRoutes");
const knowledgeRoutes = require("./routes/knowledgeRoutes");
const solutionRoutes = require("./routes/solutionRoutes");
const documentRoutes = require("./routes/documentRoutes");
const clauseRoutes = require("./routes/clauseRoutes");
const clauseExplanationRoutes = require("./routes/clauseExplanationRoutes");
const questionRoutes = require("./routes/questionRoutes");
const speechRoutes = require("./routes/speechRoutes");
const voiceAskRoutes = require("./routes/voiceAskRoutes");

const app = express();

// Database
connectDB();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/offices", officeRoutes);
app.use("/api/knowledge", knowledgeRoutes);
app.use("/api/solutions", solutionRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/clauses", clauseRoutes);
app.use("/api/clause-explanations", clauseExplanationRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/speech", speechRoutes);
app.use("/api/voice", voiceAskRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Legal Access API running" });
});

// Error handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
