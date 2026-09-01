import mongoose from "mongoose";
import dns from "dns";
import "dotenv/config";
import productModel from "./models/productModel.js";

try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}

const sampleProducts = [
    {
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 100,
        image: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: Date.now() - 100000,
        bestseller: true
    },
    {
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A premium pure cotton t-shirt with modern styling, soft feel and breathable comfort for daily wear.",
        price: 200,
        image: [
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: Date.now() - 200000,
        bestseller: true
    },
    {
        name: "Girls Round Neck Cotton Top",
        description: "Vibrant and durable kids cotton top, soft on skin and easy to wash.",
        price: 220,
        image: ["https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "L", "XL"],
        date: Date.now() - 300000,
        bestseller: true
    },
    {
        name: "Men Slim Fit Casual Shirt",
        description: "Tailored fit formal and casual shirt made from breathable combed cotton.",
        price: 110,
        image: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "XXL"],
        date: Date.now() - 400000,
        bestseller: true
    },
    {
        name: "Women Floral Printed Summer Top",
        description: "Elegant lightweight summer top with gentle floral patterns and a relaxed drape.",
        price: 130,
        image: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: Date.now() - 500000,
        bestseller: true
    },
    {
        name: "Men Tapered Fit Flat-Front Chinos",
        description: "Classic stretch cotton trousers, ideal for office or weekend outings.",
        price: 190,
        image: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 600000,
        bestseller: false
    },
    {
        name: "Women High-Rise Wide Leg Trousers",
        description: "Chic palazzo-style comfortable trousers with belt loops and clean pleats.",
        price: 200,
        image: ["https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"],
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 700000,
        bestseller: false
    },
    {
        name: "Women Zip-Front Quilted Winter Jacket",
        description: "Insulated water-resistant jacket with thermal lining and deep pockets.",
        price: 270,
        image: ["https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80"],
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 800000,
        bestseller: true
    },
    {
        name: "Men Slim Fit Denim Jacket",
        description: "Rugged stone-washed denim jacket with metallic buttons and classic collar.",
        price: 290,
        image: ["https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80"],
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["M", "L", "XL"],
        date: Date.now() - 900000,
        bestseller: true
    },
    {
        name: "Boy Everyday Active Track Pants",
        description: "Comfortable kids sweatpants with elastic drawstring waist and cuffed ankles.",
        price: 160,
        image: ["https://images.unsplash.com/photo-1503944571-be6a65b3c434?auto=format&fit=crop&w=800&q=80"],
        category: "Kids",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L"],
        date: Date.now() - 1000000,
        bestseller: false
    },
    {
        name: "Women Oversized Knit Winter Sweater",
        description: "Cozy wool-blend chunky sweater perfect for cold evenings.",
        price: 240,
        image: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80"],
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 1100000,
        bestseller: false
    },
    {
        name: "Men Urban Streetwear Hoodie",
        description: "Heavyweight fleece hoodie with kangaroo pocket and double-lined hood.",
        price: 230,
        image: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"],
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 1200000,
        bestseller: true
    }
];

async function seed() {
    try {
        const uri = process.env.MONGODB_URI;
        const connectionString = (uri.includes('?') || uri.endsWith('/e-commerce')) ? uri : `${uri}/e-commerce`;
        await mongoose.connect(connectionString);
        console.log("Connected to MongoDB Atlas!");

        // Remove existing items and add rich sample products
        await productModel.deleteMany({});
        console.log("Cleared existing products.");

        await productModel.insertMany(sampleProducts);
        console.log(`Successfully added ${sampleProducts.length} sample products to database!`);

        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seed();
