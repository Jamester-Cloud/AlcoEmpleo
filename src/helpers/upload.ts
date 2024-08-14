import { writeFile, readFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { fileValidator, fileSizeValidator } from "./fileValidator";
import multer from "multer";
import { GridFsStorage } from 'multer-gridfs-storage'
/**
 * @param File
 * upload functions for images or docs to mongoDB buckets
 */
export default function upload() {
  const mongodbUrl: any = process.env.MONGO_URI
  const storage = new GridFsStorage({
    url: mongodbUrl,
    file: (req, file) => {
      console.log(req)
      return new Promise((resolve, _reject) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: "uploads",
        };
        console.log("Archivo subido")
        resolve(fileInfo);
      });
    },
  });

  return multer({ storage });
}