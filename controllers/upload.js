// const { uploadToCloudinary } = require("../services/cloudinary");
// const Responder = require("../services/responder")
// const path = require("path")
// const multer = require("multer")

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "Images")
//   },
//   filename: (req, file, cb) => {
//     console.log("file", file)
//     cb(null, Date.now(), path.extname(file.originalname))
//   }
// })

// const upload = multer({ dest: "/images" })

// module.exports = {
//   async uploadSingle(req, res) {
//     try {
//       upload.single('image')(req, res, async (err) => {
//         if (err instanceof multer.MulterError) {
//           return res.status(400).json({ message: 'Multer error: ' + err.message });
//         } else if (err) {
//           return res.status(500).json({ message: 'Internal server error' });
//         }
//         const result = await uploadToCloudinary(req.file.path, "profile-images");
//         return Responder.success({ req, res, data: result, message: 'Uploaded successfully.' });
//       })
//     } catch (error) {
//       return Responder.internalServerError({ req, res, error });
//     }
//   }
// }