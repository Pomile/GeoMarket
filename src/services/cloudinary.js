import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.config();
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET  } = process.env;
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

class Cloudinary {
    static uploadImage(imagePath, callback) {
        cloudinary.v2.uploader.upload(imagePath,
            {
                unique_filename: false,
                use_filename: true,
                invalidate: true,
                folder: 'geomarkets/',
                transformation: [
                    {
                        width: 800, height: 600, crop: 'fit',
                    }],
            },
            (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, result);
                }
            });
    }
}

export default Cloudinary;
