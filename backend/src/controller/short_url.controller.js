import { nanoid } from "nanoid";
import { generateShortId } from "../utils/helper.js";
import UrlModel from "../model/shorturl.model.js";

export const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body
        if (!url) {
            return res.status(400).send({ error: 'URL is required' })
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: 'User must be logged in to create a short URL' });
        }

        const id = await generateShortId(7);
        const newUrl = new UrlModel({
            full_url: url,
            short_url: id,
            user: req.user._id
        })
        await newUrl.save()
        res.status(201).json({
            short_url: id
        });

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

export const getShortUrl = async (req, res) => {
    const { id } = req.params;
    
    const url = await UrlModel.findOneAndUpdate({ short_url: id }, { $inc: { count: 1 } });
   console.log(url.full_url)
    if (url) {
        res.redirect(url.full_url)
    }
    else {
        res.send("No URL found")
    }
}
