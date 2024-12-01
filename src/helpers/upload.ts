import { fileSizeValidator } from "./fileValidator";
import { Readable } from "stream";
import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
/**
 * @param File
 * @param bucketName
 * upload functions for images or docs to mongoDB buckets
 */
export default async function upload(file: File, bucketName: String, context: String) {
  await connect ();
  const mongodbUrl: any = process.env.MONGO_URI
  await mongoose.connect(mongodbUrl)
  //we treat the image
  let arrayBuffer = await file.arrayBuffer()
  let buffer = new Uint8Array(arrayBuffer)
  let readBuffer = new Readable()

  readBuffer.push(buffer)
  readBuffer.push(null)
  let { db } = mongoose.connection

  if(!fileSizeValidator(file.size)) return 'Archivo muy pesado para la DB';

  let bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: `${bucketName}`,
  });

  let newFileName = file.name.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/_+/, '_')

  let uploadStream = bucket.openUploadStream(newFileName, {
    chunkSizeBytes: 1048576,
    metadata: { field: `${bucketName}`, value: context }
  })

  //retornamos el id
  return readBuffer.pipe(uploadStream).id

}