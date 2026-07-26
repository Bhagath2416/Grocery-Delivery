import { prisma } from "./config/prisma.js"
import { Prisma } from "./generated/prisma/client.js"

const seedDB=async()=>{
    try{
      await prisma.product.deleteMany({})
      console.log("Cleared existing products")
         
    //   add products lists->add each product diff objects
    // const products: Prisma.ProductCreateManyInput[] this is type
      const products: Prisma.ProductCreateManyInput[]=[
        {
            
            name: "Butter Croissant 100g",
            description: "Flaky and buttery croissant",
            price: 45,
            originalPrice: 50,
            image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png",
            category: "bakery",
            unit: "100g",
            stock: 100,
            isOrganic: false,
            rating: 4.5,
            reviewCount: 12,
           
        },
        {
           
            name: "Organic Quinoa 500g",
            description: "High protein, gluten free",
            price: 299,
            originalPrice: 349,
            image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/xy4v0x4q6n2ylowiswva.png",
            category: "grains",
            unit: "500g",
            stock: 80,
            isOrganic: true,
            rating: 4.7,
            reviewCount: 38,
            
        },
        {
            
            name: "Fresh Broccoli",
            description: "Farm fresh broccoli",
            price: 89,
            originalPrice: 110,
            image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/ojh8gq8m0wz9mxwz1m4y.png",
            category: "vegetables",
            unit: "500g",
            stock: 70,
            isOrganic: true,
            rating: 4.6,
            reviewCount: 28,
           
        },
        {
            
            name: "Fresh Orange Juice",
            description: "100% natural orange juice",
            price: 120,
            originalPrice: 140,
            image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/nt9l8m8jqc6lwwd7zn4m.png",
            category: "beverages",
            unit: "1L",
            stock: 60,
            isOrganic: false,
            rating: 4.4,
            reviewCount: 51,
          
        },
        {
        
            name: "Fresh Strawberries",
            description: "Sweet and juicy strawberries",
            price: 160,
            originalPrice: 190,
            image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/jf5hghvzkh4qg8e4jvbm.png",
            category: "fruits",
            unit: "250g",
            stock: 90,
            isOrganic: true,
            rating: 4.8,
            reviewCount: 64,
           
        },
      ];

      await prisma.product.createMany({data: products})
      console.log(`Created ${products.length} products`)
      console.log("Seed completed successfully!")
      process.exit(0);

    }catch(error){
    console.error("Seed error:", error)
    process.exit(1);

    // process.exit(0); → Exit successfully (no error).
    // process.exit(1); → Exit with an error or failure.
    }finally{
        await prisma.$disconnect()
    }
}

// call seed db
seedDB();
// add script in packet.json
// just use seed instead of  ->tsx seed.ts