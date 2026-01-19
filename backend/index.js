import express from 'express';
import { nanoid } from 'nanoid';
import { connectDB } from './src/config/mongo.js'
import dotenv from 'dotenv';
import ShortUrlRouter from './src/routes/short_url.route.js';
import cors from 'cors';
import AuthRouter from './src/routes/user.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use('/api/user', AuthRouter);
app.use('/api/url', ShortUrlRouter);

app.listen(3000, async () => {
    await connectDB()
    console.log("server is running")
})