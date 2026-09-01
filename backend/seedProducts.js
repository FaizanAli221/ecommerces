import mongoose from "mongoose";
import dns from "dns";
import "dotenv/config";
import productModel from "./models/productModel.js";

try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}

const products = [
    // ================= MEN'S COLLECTION (14 Products) =================
    {
        name: "Men Premium Slim Fit Oxford Cotton Shirt",
        description: "Crafted from 100% long-staple combed cotton, this Oxford shirt offers a crisp yet comfortable drape suitable for executive meetings and casual weekends alike.",
        price: 85,
        image: [
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 100000,
        bestseller: true
    },
    {
        name: "Men Classic Relaxed Fit Denim Jacket",
        description: "Vintage-inspired stone-washed heavyweight denim jacket featuring custom brass hardware, dual chest pockets, and button-adjust tabs at the waist.",
        price: 130,
        image: [
            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["M", "L", "XL", "XXL"],
        date: Date.now() - 200000,
        bestseller: true
    },
    {
        name: "Men Essential Heavyweight Cotton Crewneck T-Shirt",
        description: "A foundational wardrobe staple engineered from 240 GSM organic cotton with reinforced ribbed collar and clean double-needle stitching.",
        price: 45,
        image: [
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL", "XXL"],
        date: Date.now() - 300000,
        bestseller: true
    },
    {
        name: "Men Tailored Tapered Flat-Front Chinos",
        description: "Modern stretch cotton twill trousers tailored with a sleek tapered silhouette, slant pockets, and subtle wrinkle-resistant finish.",
        price: 95,
        image: [
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 400000,
        bestseller: false
    },
    {
        name: "Men Urban Fleece Streetwear Hoodie",
        description: "Plush heavyweight cotton-blend fleece hoodie with a double-layered structured hood, kangaroo front pouch, and ribbed cuffs.",
        price: 110,
        image: [
            "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 500000,
        bestseller: true
    },
    {
        name: "Men Casual Striped Button-Down Linen Shirt",
        description: "Breathable pure European flax linen shirt featuring timeless vertical pinstripes and relaxed camp collar styling.",
        price: 75,
        image: [
            "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: Date.now() - 600000,
        bestseller: false
    },
    {
        name: "Men Performance Stretch Slim Chino Shorts",
        description: "Lightweight 9-inch inseam chino shorts with 4-way stretch flex technology, moisture-wicking properties, and secure back pocket.",
        price: 60,
        image: [
            "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 700000,
        bestseller: false
    },
    {
        name: "Men Thermal Puffer Bomber Jacket",
        description: "Windproof and water-repellent quilted puffer jacket filled with eco-down insulation and finished with cozy storm cuffs.",
        price: 160,
        image: [
            "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["M", "L", "XL", "XXL"],
        date: Date.now() - 800000,
        bestseller: true
    },
    {
        name: "Men Vintage Washed Graphic Tee",
        description: "Soft pigment-dyed jersey tee featuring custom vintage motorsport graphics and a worn-in retro feel.",
        price: 40,
        image: [
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 900000,
        bestseller: false
    },
    {
        name: "Men French Terry Athletic Joggers",
        description: "Premium loopback French terry joggers with tapered athletic cut, metal-tipped drawstrings, and zippered side pockets.",
        price: 70,
        image: [
            "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 1000000,
        bestseller: false
    },
    {
        name: "Men Minimalist Merino Wool Turtleneck Sweater",
        description: "Superfine 100% Australian Merino wool turtleneck sweater offering thermal regulation without unnecessary bulk.",
        price: 120,
        image: [
            "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 1100000,
        bestseller: false
    },
    {
        name: "Men Rugged Corduroy Overshirt",
        description: "Thick 8-wale corduroy shacket designed for layered transitional dressing with dual utility chest pockets.",
        price: 90,
        image: [
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: Date.now() - 1200000,
        bestseller: false
    },
    {
        name: "Men Lightweight Water-Resistant Windbreaker",
        description: "Technical ripstop nylon windbreaker with breathable mesh lining, adjustable hood, and packable pocket design.",
        price: 105,
        image: [
            "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 1300000,
        bestseller: false
    },
    {
        name: "Men Formal Checked Dress Shirt",
        description: "Refined poplin dress shirt featuring subtle micro-check weave, spread collar, and convertible French cuffs.",
        price: 80,
        image: [
            "https://images.unsplash.com/photo-1620012253295-c15c429fbb40?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 1400000,
        bestseller: false
    },

    // ================= WOMEN'S COLLECTION (14 Products) =================
    {
        name: "Women Round Neck Ribbed Knit Top",
        description: "Ultra-soft modal blend fine-ribbed top with contouring silhouette, clean neckline, and all-day stretch comfort.",
        price: 55,
        image: [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: Date.now() - 1500000,
        bestseller: true
    },
    {
        name: "Women High-Rise Wide-Leg Palazzo Pants",
        description: "Flowy tailored trousers designed with a sculpting high waist, deep front pleats, and elegant fluid silhouette.",
        price: 90,
        image: [
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 1600000,
        bestseller: true
    },
    {
        name: "Women Quilted Down Winter Puffer Jacket",
        description: "Thermal insulated hooded puffer jacket featuring a wind-resistant shell, fleece-lined pockets, and cinched waist detailing.",
        price: 180,
        image: [
            "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 1700000,
        bestseller: true
    },
    {
        name: "Women Elegant Floral Print Summer Blouse",
        description: "Delicate chiffon blouse with botanical floral watercolor motifs, billowy raglan sleeves, and gentle tie neckline.",
        price: 65,
        image: [
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 1800000,
        bestseller: false
    },
    {
        name: "Women Oversized Chunky Knit Wool Sweater",
        description: "Relaxed slouchy knit sweater spun from soft alpaca-wool blend yarns with dropped shoulders and ribbed trims.",
        price: 115,
        image: [
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L"],
        date: Date.now() - 1900000,
        bestseller: true
    },
    {
        name: "Women Tailored Linen Single-Breasted Blazer",
        description: "Structured yet effortless blazer tailored in breathable pure linen with notched lapels and horn button closure.",
        price: 140,
        image: [
            "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 2000000,
        bestseller: false
    },
    {
        name: "Women Casual Cotton Midi Shirt Dress",
        description: "Effortless belted shirt dress crafted in crisp poplin cotton with utility patch pockets and curved hemline.",
        price: 95,
        image: [
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: Date.now() - 2100000,
        bestseller: true
    },
    {
        name: "Women High-Waisted Stretch Straight Denim",
        description: "Authentic premium denim with 1% elastane comfort stretch, flattering vintage high rise, and straight ankle crop.",
        price: 85,
        image: [
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 2200000,
        bestseller: false
    },
    {
        name: "Women Cropped Cozy Fleece Hoodie",
        description: "Modern cropped hoodie in super-soft brushed fleece with dropped shoulders and tonal drawstrings.",
        price: 60,
        image: [
            "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L"],
        date: Date.now() - 2300000,
        bestseller: false
    },
    {
        name: "Women Satin Silk V-Neck Party Cami Top",
        description: "Lustrous heavyweight silk-satin camisole with adjustable spaghetti straps and French seam finishings.",
        price: 50,
        image: [
            "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: Date.now() - 2400000,
        bestseller: false
    },
    {
        name: "Women Minimalist Trench Coat with Belt",
        description: "Double-breasted timeless water-resistant cotton-gabardine trench coat featuring storm flaps and removable waist belt.",
        price: 195,
        image: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 2500000,
        bestseller: true
    },
    {
        name: "Women Relaxed Fit Drawstring Linen Trousers",
        description: "Casual summer staple trousers with elasticated paperbag waistband, side pockets, and straight leg drape.",
        price: 70,
        image: [
            "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 2600000,
        bestseller: false
    },
    {
        name: "Women Bohemian Embroidered Peasant Top",
        description: "Artisanal textured cotton blouse with intricate floral chain-stitch embroidery and tassel tie neckline.",
        price: 65,
        image: [
            "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: Date.now() - 2700000,
        bestseller: false
    },
    {
        name: "Women Faux Leather Biker Motorcycle Jacket",
        description: "Edgy butter-soft vegan leather moto jacket featuring asymmetrical metal zips, snap lapels, and quilted elbow panels.",
        price: 150,
        image: [
            "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 2800000,
        bestseller: true
    },

    // ================= KIDS' COLLECTION (14 Products) =================
    {
        name: "Girls Pastel Butterfly Print Cotton Tee",
        description: "Hypoallergenic 100% organic cotton tee with cute shimmer butterfly print, tagless collar, and gentle stretch seams.",
        price: 30,
        image: [
            "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 2900000,
        bestseller: true
    },
    {
        name: "Boys Everyday Active Cotton Joggers",
        description: "Durable reinforced-knee athletic joggers for boys with flexible elastic waistband and ribbed ankle cuffs.",
        price: 38,
        image: [
            "https://images.unsplash.com/photo-1503944571-be6a65b3c434?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Kids",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 3000000,
        bestseller: true
    },
    {
        name: "Kids Colorblock Lightweight Zip Hoodie",
        description: "Fun and vibrant fleece-lined zip hoodie designed for school recess and active outdoor play.",
        price: 48,
        image: [
            "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Kids",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 3100000,
        bestseller: true
    },
    {
        name: "Girls Floral Tiered Ruffle Cotton Dress",
        description: "Playful twirl-ready sun dress tailored in breezy breathable cotton with flutter sleeves and full lining.",
        price: 45,
        image: [
            "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: Date.now() - 3200000,
        bestseller: false
    },
    {
        name: "Boys Classic Denim Trucker Jacket",
        description: "Miniature authentic denim jacket featuring durable twin-needle stitching and easy snap buttons for kids.",
        price: 55,
        image: [
            "https://images.unsplash.com/photo-1471286174890-9c112ffca564?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Kids",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 3300000,
        bestseller: false
    },
    {
        name: "Kids Thermal Fleece Winter Sweatshirt",
        description: "Cozy crewneck sweatshirt in soft brushed fleece with stretch rib collar and festive winter colors.",
        price: 42,
        image: [
            "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Kids",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L"],
        date: Date.now() - 3400000,
        bestseller: false
    },
    {
        name: "Girls Stretch Twill Cargo Pants",
        description: "Trendy multi-pocket utility cargo trousers with elastic back waistband for a comfy all-day fit.",
        price: 36,
        image: [
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Kids",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 3500000,
        bestseller: false
    },
    {
        name: "Boys Striped Crewneck Skater T-Shirt",
        description: "Classic yarn-dyed horizontal stripe cotton skater t-shirt that resists shrinkage and fading wash after wash.",
        price: 28,
        image: [
            "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 3600000,
        bestseller: true
    },
    {
        name: "Girls Cozy Knitted Cardigan",
        description: "Charming button-up knit cardigan in soft non-itch acrylic-cotton blend with subtle scallop edges.",
        price: 40,
        image: [
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Kids",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L"],
        date: Date.now() - 3700000,
        bestseller: false
    },
    {
        name: "Boys Drawstring Quick-Dry Swim & Play Shorts",
        description: "Fast-drying UPF 50+ sun protective play shorts with mesh liner, elastic waistband, and side pockets.",
        price: 26,
        image: [
            "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Kids",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L"],
        date: Date.now() - 3800000,
        bestseller: false
    },
    {
        name: "Kids Dinosaur Print Organic Cotton Pajama Set",
        description: "Two-piece snug-fit pajama set crafted with chemical-free organic cotton and playful dinosaur graphic illustrations.",
        price: 34,
        image: [
            "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 3900000,
        bestseller: true
    },
    {
        name: "Girls Puffer Vest with Sherpa Collar",
        description: "Quilted insulated zip-up vest featuring a plush faux sherpa fleece collar and lightweight windproof body.",
        price: 46,
        image: [
            "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Kids",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L"],
        date: Date.now() - 4000000,
        bestseller: false
    },
    {
        name: "Boys Casual Plaid Flannel Button-Up Shirt",
        description: "Warm brushed cotton flannel shirt with dual chest flap pockets and adjustable button cuffs for boys.",
        price: 35,
        image: [
            "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 4100000,
        bestseller: false
    },
    {
        name: "Kids Unisex Cotton Graphic Pocket Tee",
        description: "Durable everyday essential crewneck tee with a handy front chest pocket and soft pre-washed cotton finish.",
        price: 24,
        image: [
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: Date.now() - 4200000,
        bestseller: false
    }
];

async function seed() {
    try {
        const uri = process.env.MONGODB_URI;
        const connectionString = (uri.includes('?') || uri.endsWith('/e-commerce')) ? uri : `${uri}/e-commerce`;
        await mongoose.connect(connectionString);
        console.log("Connected to MongoDB Atlas!");

        await productModel.deleteMany({});
        console.log("Cleared old products.");

        const inserted = await productModel.insertMany(products);
        console.log(`SUCCESS: Inserted ${inserted.length} high-quality products into MongoDB Atlas!`);
        console.log(`- Men: 14 products`);
        console.log(`- Women: 14 products`);
        console.log(`- Kids: 14 products`);

        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
}

seed();
