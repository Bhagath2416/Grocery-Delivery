import type { Order } from "../types/index";

export const dummyDashboardOrdersdata: Order[] = [
    {
      _id: "CAC763A7",
  
      user: {
        _id: "U1",
        name: "John Doe",
        email: "john@example.com",
        phone: "9876543210",
      },
  
      items: [
        {
          product: "P1",
          name: "7 Up 1.5L",
          image:
            "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=300",
          price: 75.6,
          quantity: 1,
          unit: "Bottle",
        },
      ],
  
      shippingAddress: {
        label: "Home",
        address: "MG Road",
        city: "Bangalore",
        state: "Karnataka",
        zip: "560001",
        lat: 12.9716,
        lng: 77.5946,
      },
  
      paymentMethod: "Cash on Delivery",
  
      subtotal: 75.6,
      deliveryFee: 20,
      tax: 5,
      total: 100.6,
  
      status: "Placed",
  
      statusHistory: [
        {
          status: "Placed",
          timestamp: new Date().toISOString(),
          note: "Order placed successfully",
        },
      ],
  
      deliveryPartner: null,
  
      deliveryOtp: "1234",
  
      isPaid: false,
  
      createdAt: new Date().toISOString(),
    },
  
    {
      _id: "F8D92B31",
  
      user: {
        _id: "U1",
        name: "John Doe",
        email: "john@example.com",
      },
  
      items: [
        {
          product: "P2",
          name: "Amul Milk 1L",
          image:
            "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300",
          price: 64.7,
          quantity: 2,
          unit: "L",
        },
        {
          product: "P3",
          name: "Bread",
          image:
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300",
          price: 86,
          quantity: 1,
          unit: "Pack",
        },
      ],
  
      shippingAddress: {
        label: "Home",
        address: "MG Road",
        city: "Bangalore",
        state: "Karnataka",
        zip: "560001",
        lat: 12.9716,
        lng: 77.5946,
      },
  
      paymentMethod: "UPI",
  
      subtotal: 215.7,
      deliveryFee: 20,
      tax: 10,
      total: 245.7,
  
      status: "Out for Delivery",
  
      statusHistory: [
        {
          status: "Placed",
          timestamp: new Date().toISOString(),
          note: "Order placed successfully",
        },
        {
          status: "Out for Delivery",
          timestamp: new Date().toISOString(),
          note: "Delivery partner assigned",
        },
      ],
  
      deliveryPartner: {
        _id: "DP1",
        name: "Rahul Kumar",
        email: "rahul@gmail.com",
        phone: "9876543210",
        avatar: "https://i.pravatar.cc/150?img=1",
        vehicleType: "bike",
        isActive: true,
        createdAt: new Date().toISOString(),
      },
  
      deliveryOtp: "5678",
  
      isPaid: true,
  
      createdAt: new Date().toISOString(),
    },
  ];