import mongoose from "mongoose";

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