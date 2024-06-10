"use server"
import path from "path";
import { writeFile, readFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { fileValidator } from "./fileValidator";
/**
 * @param File
 * upload functions for images or docs
 */
export default async function uploadImage(formFile: File) {
    try {
        const file = formFile;
        let isValid = fileValidator(file.type)  
        if (isValid) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            const filename = Date.now() + file.name.replaceAll(" ", "_");

            await writeFile(`./public/candidate/uploads/${filename}`, buffer);

            //retornamos informacion del archivo
            let img = {
                contentType: file.type,
                size: file.size,
                path: `./public/candidate/uploads/${filename}`
            }

            revalidatePath("/");
            return img
        }
        if (!isValid) return 'extension de archivo invalida. Rectifique'
    } catch (error) {
        console.log("Error occured ", error);
    }
}