import express from "express";
import cors from "cors";
import { Connection } from "../database/db.js";
import userRouter from "../routes/user.route.js";
import profileRouter from "../routes/profile.route.js";
import forumRouter from "../routes/forum.route.js";
import path from 'path';
import dotenv from "dotenv";
import session from 'express-session';
dotenv.config();

const app = express();

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use(express.json());
app.get("/", (req, res) => {
  return res.status(200).json("Server is running");
});
app.use('/api', userRouter);
app.use('/api', profileRouter);
app.use('/api', forumRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(process.env.APP_PORT, () => {
  Connection();
  console.log(`Server is running at http://localhost:${process.env.APP_PORT}`);
});
