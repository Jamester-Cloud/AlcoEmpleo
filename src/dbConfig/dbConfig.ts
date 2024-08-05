import mongoose from "mongoose";

export async function connect() {
    try {
        let bucket;
        
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        await connection.startSession()

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
            bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                bucketName: "filesBucket",
              });
            console.log("Bucket initialized!")
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

        return connection;

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);

    }
}