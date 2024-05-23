import { S3 } from '../lib/s3.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ApiResponse } from "../utils/response.utils.js";
import { asyncHandler } from "../utils/async.utils.js";

const slugifyString = (str) => {
    return str.trim().toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-').replace(/[^a-z0-9-.]/g, '-');
}
 
const getSignedUrlFunc = asyncHandler(async (req, res) => {
  
    const { fileName, fileType } = req.body;    
    if (!fileName || !fileType || fileName.trim() === '' || fileType.trim() === '') {
        return res
        .status(400)
        .json(
        new ApiResponse(400, null, "file name or key is required")
        );
    }
    const objectKey = `${slugifyString(Date.now().toString())}-${slugifyString(fileName)}`;


    const presignedUrl = await getSignedUrl(S3, new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
        Key: objectKey, 
        ContentType: fileType,
        ACL: 'public-read'
    }), {
        expiresIn: 60 * 5 // 5 minutes
    });

    return res
    .status(200)
    .json(
      new ApiResponse(200, {presignedUrl, objectKey})
    );
});

export { getSignedUrlFunc };