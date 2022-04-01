import aws from 'aws-sdk';
import { Router } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import slugify from 'slugify';

const s3 = new aws.S3({
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_ID,
  secretAccessKey: process.env.S3_ACCESS_KEY,
})

const storage = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    metadata(req: any, file: { fieldname: any; }, cb: (arg0: any, arg1: { fieldname: any; }) => void) {
      cb(null, { fieldname: file.fieldname });
    },
    key(req: any, file: { fieldname: any; originalname: string; }, cb: (arg0: any, arg1: string) => void) {
      cb(null, `${file.fieldname}/${Date.now()}_${slugify(file.originalname)}`);
    },

  }),
})

const driverIdentityUploader = ({
  fields,
  name = null,
  tag = 'file',
  access = 'public',
}: {
  fields: any;
  name?: string;
  tag?: string;
  access?: string;
}) => {
  const router = Router();
  router.use(storage.fields(fields), async (req: any, res, next) => {
    req.body.residence = JSON.parse(req.body.residence)
    req.body.vehicle = JSON.parse(req.body.vehicle)
    req.body.address = JSON.parse(req.body.address)
    req.body.photo = {}

    await Promise.all(
      fields.map(async (element: { name: string; maxCount: number }) => {
        console.log('ELEMENT', element)
        if (req.files[element.name] !== undefined) {
          const file = req.files[element.name][0];
          const key = (element.name === 'registrationCertificate') ? `vehicle` : `photo`
          req.body[key][element.name] = file.location;
          delete req.body[element.name]
        } else {
          const key = (element.name === 'registrationCertificate') ? `vehicle` : `photo`
          req.body[key][element.name] = '';
          delete req.body[element.name]
        }
      }),
    );
    next();
  });
  return router;
};

const driverIdentityPatcher = ({
  fields,
  name = null,
  tag = 'file',
  access = 'public',
}: {
  fields: any;
  name?: string;
  tag?: string;
  access?: string;
}) => {
  const router = Router();
  router.use(storage.fields(fields), async (req: any, res, next) => {
    Object.entries(req.body).map(([items, value]) => {
      if (value === '') {
        delete req.body[items]
      }
    })

    req.body.vehicle = {}
    req.body.photo = {}

    await Promise.all(
      fields.map(async (element: { name: string; maxCount: number }) => {
        console.log('ELEMENT', element)
        if (req.files[element.name] !== undefined) {
          const file = req.files[element.name][0];
          const key = (element.name === 'registrationCertificate') ? `vehicle` : `photo`
          req.body[key][element.name] = file.location;
          delete req.body[element.name]
        } else {
          const key = (element.name === 'registrationCertificate') ? `vehicle` : `photo`
          req.body[key][element.name] = null;
          delete req.body[element.name]
        }
      }),
    );
    next();
  });
  return router;
};

export {
  driverIdentityUploader,
  driverIdentityPatcher,
}
