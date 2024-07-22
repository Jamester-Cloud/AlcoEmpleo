"use server"
import { writeFile, readFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { fileValidator, fileSizeValidator } from "./fileValidator";
/**
 * @param File
 * upload functions for images or docs
 */
export default async function uploadImage(formFile: File, pathType: string) {
    try {
        const file = formFile;
        console.log("El archivo es:", file)
        console.log("la ruta de este archivo es:", __filename)
        let isValid = fileValidator(file.type)
        let validSize = fileSizeValidator(file.size)
        console.log("Tamaño de archivo es: ", file.size)
        console.log("extension de archivo es: ", isValid)
        if (isValid && validSize) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            const filename = Date.now() + file.name.replaceAll(" ", "_");
            await writeFile(`.next/server/public/uploads/${pathType}/${filename}`, buffer);

            //retornamos informacion del archivo
            let img = {
                contentType: file.type,
                size: file.size,
                path: `/var/task/.next/server/public/uploads/${pathType}/${filename}`
            }

            console.log("Archivo subido exitosamente")

            revalidatePath("/");

            return img
        }

        if (!validSize) return 'Archivo muy grande para ser guardado. Intente con otro, por favor'
        if (!isValid) return 'Extension de archivo invalida. Admitidas: Jpeg, JPG, PNG y PDF'

    } catch (error) {
        console.log("Error occured ", error);
    }
}