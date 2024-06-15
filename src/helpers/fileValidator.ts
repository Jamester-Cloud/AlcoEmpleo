
export const fileValidator = (fileType:String) => fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png' || fileType === 'pdf'

export const fileSizeValidator = (fileSize:Number, max:Number = 40000000) => fileSize <= max 