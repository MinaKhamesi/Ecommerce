import mongoose from 'mongoose';

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:true,
        })

        console.log(`MongoDB connected: ${conn.connection.host}`.yellow.bold);
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold.italic);
        process.exit(1);
    }
}

export default connectDB;