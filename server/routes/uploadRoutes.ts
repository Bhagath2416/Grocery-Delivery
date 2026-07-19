// create api for uploading images  of product
// productController.ts->createProduct deggara same rasam

import express from "express";
import auth from "../middleware/auth.js";
// here importing multer->it is a middleware when user uploads a photo .the middle converts to usable photo on server side

import multer from 'multer'
import cloudinary from "../config/cloudinary.js";

const uploadRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage })
// here having upload function handle the file uplaoded one
// single->here images adding one by one
// inside single it is image property
uploadRouter.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        // actual data (photos)stored in req.file.buffer()
        // if data or phots not availabe
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }
        // upload file if available->upload file on cloudinary to store in cloud storage
        // convert image in base64.inside buffer contains imp information
        const b64 = Buffer.from(req.file.buffer).toString("base64")
            const dataURI="data:" + req.file.mimetype + ";base64," + b64;

            // upload on cloudinary
            const result = await cloudinary.uploader.upload(dataURI, {
                folder: "grocry-del",
                resource_type:"auto",
            })
            res.json({url: result.secure_url})
        
    } catch (error: any) {
         res.status(500).json({message: error.message})
    }
})

export default uploadRouter
