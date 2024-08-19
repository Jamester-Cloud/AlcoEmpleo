import mongoose, { Types } from "mongoose";

/**
 * @param File
 * @param bucketName
 * See images or docs in mongoDB buckets
 */
export default async function imageVisor(idArchivo: string, bucketName: String) {
    //connection
    const mongodbUrl: any = process.env.MONGO_URI
    await mongoose.connect(mongodbUrl)
    let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: `${bucketName}` })
    //retrieve file as a stream
    let downloadStream: any = gfs.openDownloadStream(Types.ObjectId.createFromHexString(idArchivo))
    return downloadStream
}