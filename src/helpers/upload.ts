"use server"
import { writeFile, readFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { fileValidator, fileSizeValidator } from "./fileValidator";
import multer from "multer";
import { GridFsStorage } from 'multer-gridfs-storage'
/**
 * @param File
 * upload functions for images or docs to mongoDB buckets
 */
export default async function upload() {
    try {
        const mongodbUrl: any = process.env.MONGO_URI
        const storage = new GridFsStorage({
            url: mongodbUrl,
            file: (req, file) => {
                return new Promise((resolve, _reject) => {
                    const fileInfo = {
                        filename: file.originalname,
                        bucketName: "filesBucket",
                    };
                    resolve(fileInfo);
                });
            },
        });

        return multer({ storage });
        // if (isValid && validSize) {
        //     const arrayBuffer = await file.arrayBuffer();
        //     const buffer = new Uint8Array(arrayBuffer);
        //     const filename = Date.now() + file.name.replaceAll(" ", "_");
        //     await writeFile(`/var/task/.next/server/public/uploads/${pathType}/${filename}`, buffer);

        //     //retornamos informacion del archivo
        //     let img = {
        //         contentType: file.type,
        //         size: file.size,
        //         path: `/var/task/.next/server/public/uploads/${pathType}/${filename}`
        //     }

        //     console.log("Archivo subido exitosamente")

        //     revalidatePath("/");

        //     return img
        // }

        // if (!validSize) return 'Archivo muy grande para ser guardado. Intente con otro, por favor'
        // if (!isValid) return 'Extension de archivo invalida. Admitidas: Jpeg, JPG, PNG y PDF'

    } catch (error) {
        console.log("Error occured ", error);
    }
}