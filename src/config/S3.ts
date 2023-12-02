import fs from 'node:fs'
import S3 from 'aws-sdk/clients/s3'

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
})

export async function uploadFile(file: Express.Multer.File, filename: string) {
  const fileStream = fs.createReadStream(file.path)

  return s3
    .upload({
      Bucket: bucketName as string,
      Key: filename,
      Body: fileStream,
    })
    .promise()
}

export function getFileStream(fileKey: string) {
  return s3
    .getObject({
      Bucket: bucketName as string,
      Key: fileKey,
    })
    .createReadStream()
}
