import path from "path";
import { writeFile } from "fs/promises";
export default async function uploadImage(formFile: File) {

    const file = formFile;
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");
    console.log(filename);
    try {
        await writeFile(`./public/uploads/${filename}`, buffer)
        return 'Image successfully uploaded'
    } catch (error) {
        console.log("Error occured ", error);
    }
}