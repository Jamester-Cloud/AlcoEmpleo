import mongoose from "mongoose";
import { createSearchIndexes } from "./createIndexes";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        //await connection.startSession()

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
            // Crear índices después de la conexión
            createSearchIndexes().catch(console.error);
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);

    }
}