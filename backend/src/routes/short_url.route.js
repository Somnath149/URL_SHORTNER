import { Router } from "express";
import { createShortUrl,  getShortUrl } from "../controller/short_url.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const ShortUrlRouter = Router();

ShortUrlRouter.post('/create',isAuth, createShortUrl);
ShortUrlRouter.get('/:id', getShortUrl);


export default ShortUrlRouter;