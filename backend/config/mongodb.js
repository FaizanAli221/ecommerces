import mongoose from "mongoose";
import dns from "dns";

// Ensure MongoDB Atlas SRV records resolve reliably across all networks / ISPs
try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
    // Ignore if not supported in certain environments
}

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DB Connected");
    });

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI is not defined in environment variables");
        return;
    }

    if (uri.includes('?') || uri.endsWith('/e-commerce')) {
        await mongoose.connect(uri);
    } else {
        await mongoose.connect(`${uri}/e-commerce`);
    }
};

export default connectDB;