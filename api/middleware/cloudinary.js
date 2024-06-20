import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dokxv4qdm",
  api_key: "294253416989499",
  api_secret: "fY4kcXQHIwgeyeY6G9H1v4T23tg",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    if (fs.existsSync(localFilePath)) {
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });
      console.log("File is uploaded on cloudinary ");

      fs.unlinkSync(localFilePath);
      return response;
    } else {
      console.log("File does not exist at path: ", localFilePath);
      return null;
    }
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudinary };
