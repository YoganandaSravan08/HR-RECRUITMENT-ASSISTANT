const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/candidates",require("./routes/candidateRoutes"));
app.use("/api/ats",require("./routes/atsRoutes"));
app.use("/api/interview",require("./routes/interviewRoutes"));
app.use("/api/email",require("./routes/emailRoutes"));
app.use("/api/analytics",require("./routes/analyticsRoutes"));

app.listen(process.env.PORT, () => {
console.log(
`Server Running on Port ${process.env.PORT}`
);
});