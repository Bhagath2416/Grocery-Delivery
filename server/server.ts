import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import cloudinary from "./config/cloudinary.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import orderRouter from "./routes/orderRoutes.js";


import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import addressRouter from "./routes/addressRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import deliveryPartnerRouter from "./routes/deliveryPartnerRoutes.js";
import { stripeWebhook } from "./controllers/webhooks.js";

// TEST CLOUDINARY CONNECTION
cloudinary.api.ping()
    .then(result => {
        console.log("CLOUDINARY PING SUCCESS:", result);
    })
    .catch(error => {
        console.error("CLOUDINARY PING FAILED:");
        console.error("message:", error.message);
        console.error("http_code:", error.http_code);
        console.error("details:", error.error);
    });

    const testUpload = async () => {
        try {
            const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
            const apiKey = process.env.CLOUDINARY_API_KEY!;
            const apiSecret = process.env.CLOUDINARY_API_SECRET!;
    
            const testImage =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
    
            const formData = new FormData();
            formData.append("file", testImage);
    
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: "POST",
                    headers: {
                        Authorization:
                            "Basic " +
                            Buffer.from(`${apiKey}:${apiSecret}`).toString("base64"),
                    },
                    body: formData,
                }
            );
    
            const responseText = await response.text();
    
            console.log("========== DIRECT CLOUDINARY TEST ==========");
            console.log("Status:", response.status);
            console.log("Response:", responseText);
            console.log("============================================");
    
        } catch (error) {
            console.error("DIRECT TEST ERROR:", error);
        }
    };
    
    testUpload();


    const testImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

cloudinary.uploader.upload(testImage, {
    folder: "test",
})
.then(result => {
    console.log("CLOUDINARY UPLOAD TEST SUCCESS:", result.secure_url);
})
.catch(error => {
    console.error("CLOUDINARY UPLOAD TEST FAILED");
    console.error("message:", error.message);
    console.error("http_code:", error.http_code);
    console.error("name:", error.name);
});





const app = express();
app.post("/api/stripe",express.raw({type: 'application/json'}),stripeWebhook)

// Middleware
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});
// /api/auth/register or login
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/orders',orderRouter)

app.use("/api/inngest", serve({ client: inngest, functions, }));
app.use("/api/addresses",addressRouter)
app.use("/api/admin",adminRouter)
app.use('/api/delivery',deliveryPartnerRouter)

// moving to next api solve -> (Error handling)
// it shows all error from any routes or controllers
app.use((error:any,req:Request,res:Response,next: NextFunction)=>{
    console.error(error)
    res.status(500).json({message: error.message})
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});