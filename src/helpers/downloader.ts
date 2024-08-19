
/**
 * @param File
 * @param bucketName
 * Downloads images or docs in mongoDB buckets
 */
import mongoose, { Types } from "mongoose";

export default async function downloader(idArchivo: string, bucketName: String) {
    const mongodbUrl: any = process.env.MONGO_URI

    await mongoose.connect(mongodbUrl)

    let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: `${bucketName}` })

    let downloadStream: any = gfs.openDownloadStream(Types.ObjectId.createFromHexString(idArchivo))

    let archivo = await gfs.find({ _id: Types.ObjectId.createFromHexString(idArchivo) }).toArray()

    return { downloadStream: downloadStream, fileName: archivo[0].filename }


}
