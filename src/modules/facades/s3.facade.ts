import aws from 'aws-sdk';
import { AWSError } from 'aws-sdk';

const removeS3File = async (path: string) => {
  if (path === null || path === '') {
    return true
  }
  
  const part = path.split('/')
  const key = `${part[part.length - 2]}/${part[part.length - 1]}`

  const s3 = new aws.S3({
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_ID,
    secretAccessKey: process.env.S3_ACCESS_KEY,
  })

  s3.deleteObject({
    Key: key,
    Bucket: process.env.S3_BUCKET_NAME,
  }, async (err: AWSError) => {
    if (err) { console.log(err) }
  });

}

export default removeS3File