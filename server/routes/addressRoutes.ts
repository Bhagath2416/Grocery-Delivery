import express from "express";
import auth from "../middleware/auth.js";
import { addAddresses, deleteAddresses, getAddresses, updateAddress } from "../controllers/addressController.js";

const addressRouter= express.Router()

addressRouter.get('/',auth,getAddresses)
addressRouter.post('/',auth,addAddresses)
addressRouter.put('/:id',auth,updateAddress)
addressRouter.delete('/:id',auth,deleteAddresses)

export default addressRouter