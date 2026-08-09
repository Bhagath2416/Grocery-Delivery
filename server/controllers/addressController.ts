// Get user addresses
// GET /api/addresses
import {Request, Response} from "express";
import {prisma} from "../config/prisma.js";
export const getAddresses = async (req: Request, res: Response) => {
    const addresses = await prisma.address.findMany({
        where: {userId: req.user!.id},
        orderBy: {createdAt: "asc"}
    })

    res.json({addresses})
}

// new api 

// Add address
// POST /api/addresses
export const addAddresses = async(req: Request,res: Response)=>{
    // in this body we get addresses details from frontend
    const {label, address, city,state,zip,isDefault,lat,lng}=req.body;

    // Require coordinates
    if(lat == null || lng==null){
        return res.status(400).json({message: "Location coordinates are required. Please allow location access."})
    }

    const currentAddresses = await prisma.address.findMany({
        where: { userId: req.user!.id}
    })

    // if we dont have any current addresses available then the new address that we are going to add is going to be default address
    let makeDefault= isDefault;
    if(currentAddresses.length===0) makeDefault=true;

    if(makeDefault){
        await prisma.address.updateMany({
            // at this user update data
            where: {userId: req.user!.id},
            // this data is updated in database
            // it make default false for other addresses
            data: {isDefault: false}
        })
    }
// add new address in database
    await prisma.address.create({
      data: {
        userId: req.user!.id,
        label,
        address,
        city,
        state,
        zip,
        isDefault: makeDefault,
        lat: Number(lat),
        lng: Number(lng)
      }
    })

    const addresses = await prisma.address.findMany({
        where: {userId: req.user!.id},
        orderBy: {createdAt: "asc"}
    })
    res.status(201).json({addresses})
}

// update address
// PUT /api/addresses/:id
export const updateAddress=async(req: Request,res: Response)=>{
    const {label, address, city,state,zip,isDefault,lat,lng}=req.body; 
     // Require coordinates
     if(lat == null || lng==null){
        return res.status(400).json({message: "Location coordinates are required. Please allow location access."})
    }
    if(isDefault){
        await prisma.address.updateMany({
            // at this user update data
            where: {userId: req.user!.id},
            // this data is updated in database
            // it make default false for other addresses
            data: {isDefault: false}
        })
    }
    const data: any = {};

    if (label) data.label = label;
    if (address) data.address = address;
    if (city) data.city = city;
    if (state) data.state = state;
    if (zip) data.zip = zip;
    
    if (isDefault !== undefined) {
        data.isDefault = isDefault;
    }
    
    if (lat != null) {
        data.lat = Number(lat);
    }
    
    if (lng != null) {
        data.lng = Number(lng);
    }

    try{
       await prisma.address.update({
        where: {id: req.params.id as string},
        data,
       })
    }catch(error){
   return res.status(404).json({message: "Address not found"});
    }

    const addresses=await prisma.address.findMany({
        // it will return all addresses
        where: {userId: req.user!.id},
        orderBy: {createdAt: "asc"} 
    })

    res.json({addresses})
}


// Delete address
// DELETE /api/addresses/:id
export const deleteAddresses =  async(req: Request,res: Response)=>{
    try{
        await prisma.address.delete({where: {id:req.params.id as string}})
    }catch(err : any){
        console.log(err.message)
    }

    const addresses= await prisma.address.findMany({
        where: {userId: req.user!.id},
        orderBy: {createdAt: "asc"}
    })

    res.json({addresses})
}