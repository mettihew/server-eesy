import multer from "multer"

const type = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}

export const fileUpload = multer({
    limits: 1000001,
    storage: multer.diskStorage({
        destination:(req, file, cb) => {
       cb(null, 'uploads/images')
        },
        filename: (req, file , cb) => {
     let jpg = type[file.mimetype]
     cb(null, file.originalname);
    //  cb(null, Math.random() + "." + jpg);
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!type[file.mimetype];
        let error = isValid ? null : new Error('Invalid mime type')
        cb(error, isValid)
    }
}
)

// module.exports = {fileUpload}
export default fileUpload








