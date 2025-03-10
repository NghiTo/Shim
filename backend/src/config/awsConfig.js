import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("environments/.env") });

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default s3;
