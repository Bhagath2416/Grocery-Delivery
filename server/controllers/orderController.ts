import { Request,Response } from "express";
import { prisma } from "../config/prisma.js";
import {inngest} from "../inngest/index.js";
//  Create order

// POST /api/orders->in this we are only sending productid and quantity after that the backend store all the details
export const createOrder = async (req:Request,res:Response)=>{
 const {items,shippingAddress,paymentMethod}=req.body

//  Check if order items are empty
// in items we get -> product id and quantity
if(!items || items.length===0){
return res.status(400).json({message: "No order items"})
}

// look up actual prices from the database
const productIds=items.map((i: any)=>i.product);
const products=await prisma.product.findMany({where: {id: {in:
    productIds
}}})
const productMap: Record<string, (typeof products)[0]>={}

products.forEach((p: any)=> (productMap[p.id]=p))

// check if product is in stock
for(const item of items){
    const product =productMap[item.product]
    if(!product || (product.stock ?? 0) < item.quantity){
        return res.status(404).json({message: "Product out of stock"})
    }
}

const orderItems=items.map((item: any)=>{
    const dbProduct=productMap[item.product];
    if(!dbProduct) throw new Error(`Product ${item.product } not found`);
    return{
        product: dbProduct.id,
        name: dbProduct.name,
        price: dbProduct.price,
        quantity: item.quantity,
        unit: dbProduct.unit,
    }
})
const subtotal=orderItems.reduce((sum:number,item:any)=> sum + item.price*item.quantity,0)
const deliveryFee= subtotal > 20 ? 0 : 1.99;
const tax=Math.round(subtotal * 0.08 * 100) / 100;
const total=Math.round((subtotal + deliveryFee + tax) * 100) / 100;

// it create new order in database

const order = await prisma.order.create({
    data: {
        // it should be notnull
        userId: req.user!.id,
        items: orderItems,
        shippingAddress,
        paymentMethod,
        subtotal,
        deliveryFee,
        tax,
        total,
        statusHistory: [{status: "Placed", note: "Order placed successfully",timestamp: new Date()}]
    }
})
if(paymentMethod === 'card'){
    // stripe payment link
}
// if it is cash on delivry
res.json({order})

// decrease stock
for(const item of orderItems){
    await prisma.product.update({
        where: {id: item.product},
        data: {stock: {decrement: item.quantity}}
    })
}


// Send Stock update events for each product in the order.this is done by the cron or inngest
for(const item of orderItems){
    // send an emailto admin of that product when the stock is less than 10
    await inngest.send({name: "inventory/stock.updated", data:{productId: item.product}})
}
// if rider is not availble automally assign the new rider after 5 min
// to run this inngest funtions we need to depliy our backend server->for these upload these codes on git hub->then deploy on vercel
await inngest.send({name: "order/placed",data: {orderId: order.id}})
}

// Get user's orders

// GET /api/orders
export const getUserOrders =async(req:Request,res:Response)=>{
  const {status}=req.query;

  const where: any = {
    // auth
    // he ! is the TypeScript non-null assertion operator.It tells TypeScript: "I know req.user is not null or undefined here."
    userId: req.user!.id,
    NOT: [{paymentMethod: "card", isPaid: false}]
  }

  if(status && status!=="all"){
    where.status=status;
  }
const orders= await prisma.order.findMany({
    where,
    include: {deliveryPartner: {select: {name:true,phone: true}}},
    orderBy: {createdAt: "desc"},

})
res.json({orders})
}


// get single order

// GET /api/order/:id
export const getOrder = async (req:Request,res:Response)=>{
    const order=await prisma.order.findFirst({
        where: {id: req.params.id as string, userId:req.user!.id},
        // include → Fetch related deliveryPartner information.
        include: {deliveryPartner: {select: {name:true,phone:true,avatar:true,vehicleType: true}}}
    })
    // order not available with that id
    if(!order){
        return res.status(404).json({message: "Order not found"})
    }

    // if order is available
    res.json({order})
}

// ikkada nunchi chat gpt ne adagalii


// Update order status (admin)
// PUT /api/orders/:id/status*
// only admin can update it
export const updateOrderStatus= async(req:Request,res:Response)=>{
    const {status,note}=req.body;
    const order = await prisma.order.findUnique({where: {id: req.params.id as string}})
    if(!order){
        return res.status(404).json({message:"Order not found"});
    }
    const history=(Array.isArray(order.statusHistory) ? order.
    statusHistory: []) as any[];
    history.push({status, note: note || `Order ${status.toLowerCase()}`,timestamp:new Date()})

    const updatedOrder = await prisma.order.update({
        where: {id: req.params.id as string},
        data: {status,statusHistory: history}
    })

    res.json({order: updatedOrder})

}

// Get all orders for admin
//GET /api/orders/all
export const getAllOrders = async(req:Request,res:Response)=>{
    const orders= await prisma.order.findMany({
        where: {NOT: [{paymentMethod: "card",isPaid:false}]},
        include:{
            user: {select : {name:true,email:true}},
            deliveryPartner: {select: {name:true,phone: true,email: true}}
        },
        orderBy: {createdAt: "desc"},
    })
    res.json({orders})
}


// Get order loacation
// GET /api/orders/:id/location
export const getOrderLocation= async(req: Request,res:Response)=>{
    const order= await prisma.order.findFirst(
        {where:{id: req.params.id as string, userId:req.user!.id},
    select:{liveLocation:true,status:true}}
    )
    if(!order) return res.status(404).json({message: "Order not found"})
        res.json({liveLocation: order.liveLocation, status:order.status})
}



