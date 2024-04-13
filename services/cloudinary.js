const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = {
  async uploadToCloudinary(path, folder) {
    return cloudinary.v2.uploader.upload(path, {
      folder
    })
    .then((res)=> {
      return {url: res.url, public_id: res.public_id}
    })
    .catch((err)=> {
      console.log("CLOUDINARY_ERR::>", err)
    })
  }
}
