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
        console.log(file.type)
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const filename = Date.now() + file.name.replaceAll(" ", "_");

        await writeFile(`./public/candidate/uploads/${filename}`, buffer);
        //retornamos informacio del archivo
        let img = {
            data: await readFile(`./public/candidate/uploads/${filename}`),
            contentType: file.type,
            size:file.size,
            path:`./public/candidate/uploads/${filename}`
        }

        revalidatePath("/");
        console.log('Image successfully uploaded');
        
        return img
    } catch (error) {
        console.log("Error occured ", error);
    }
}