import multer, { Multer,FileFilterCallback } from 'multer';
import path from 'node:path';
import { ApiError } from '../utils/ApiError';
const storage = multer.memoryStorage();

const allowedTypes = ["image/jpeg","image/png","image/jpg"]
const allowedExt = [".jpg",".jpeg",".png"]

const fileFilter = (req:Express.Request,file:Express.Multer.File,cb:FileFilterCallback) => {
    const ext = path.extname(file.originalname).toLocaleLowerCase();

    if(
        allowedExt.includes(ext) &&
        allowedTypes.includes(file.mimetype)
    ){
        cb(null,true)
    } else{
        cb(new ApiError(400,"Only JPG, JPEG, PNG are allowed"));
    }
}
export const upload = multer({ 
    storage: storage, 
    limits:{fileSize: 5 * 1024 * 1024},
    fileFilter
})