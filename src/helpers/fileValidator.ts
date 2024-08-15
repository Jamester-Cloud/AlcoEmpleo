
export const fileValidator = (fileType: String) => fileType === "image/jpeg" || fileType === 'image/jpg' || fileType === 'image/png'

export const filePdfValidator = (fileType: string) => fileType === "application/pdf"

export const fileSizeValidator = (fileSize: Number, max: Number = 40000000) => fileSize <= max 