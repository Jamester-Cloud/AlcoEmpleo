import { revalidatePath } from "next/cache";
import { fileValidator, fileSizeValidator } from "./fileValidator";
import { Readable } from "stream";
import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";
/**
 * @param File
 * @param bucketName
 * upload functions for images or docs to mongoDB buckets
 */
export default async function upload(file: File, bucketName: String, context: String) {

  const mongodbUrl: any = process.env.MONGO_URI

  await mongoose.connect(mongodbUrl)
  let arrayBuffer = await file.arrayBuffer()
  let buffer = new Uint8Array(arrayBuffer)
  let readBuffer = new Readable()

  readBuffer.push(buffer)
  readBuffer.push(null)
  let { db } = mongoose.connection

  if(!fileSizeValidator(file.size)) throw new Error;

  let bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: `${bucketName}`,
  });

  let uploadStream = bucket.openUploadStream(file.name, {
    chunkSizeBytes: 1048576,
    metadata: { field: `${bucketName}`, value: context }
  })

  //retornamos el id
  return readBuffer.pipe(uploadStream).id

}