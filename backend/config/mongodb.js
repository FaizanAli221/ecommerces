import mongoose from "mongoose";
import dns from "dns";

// Ensure MongoDB Atlas SRV records resolve reliably across all networks / ISPs
try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
    // Ignore if not supported in certain environments
}

let isConnected = false;

const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState === 1) {
        return;
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI is not defined in environment variables");
        return;
    }

    try {
        const connectionString = (uri.includes('?') || uri.endsWith('/e-commerce')) ? uri : `${uri}/e-commerce`;
        const db = await mongoose.connect(connectionString);
        isConnected = db.connections[0].readyState === 1;
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Failed:", error.message);
        throw error;
    }
};

export default connectDB;