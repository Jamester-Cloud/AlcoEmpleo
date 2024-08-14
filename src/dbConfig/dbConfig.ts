import mongoose from "mongoose";

export async function connect() {
    try {


        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        await connection.startSession()

        let {db} = mongoose.connection

        let bucket;
        (() => {
            mongoose.connection.on("connected", () => {
                bucket = new mongoose.mongo.GridFSBucket(db, {
                    bucketName: "uploads",
                });
            });
            console.log("Bucket initialized")
        })();

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