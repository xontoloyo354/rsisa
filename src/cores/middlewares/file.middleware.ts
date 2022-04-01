import { Router } from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/.../../files`)
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const fileMiddleware = ({
  fields,
  name = null,
  tag = 'file',
  access = 'public',
}: {
  fields: any
  name?: string
  tag?: string
  access?: string,
}) => {
  const router = Router({ mergeParams: true })
  const upload = multer({ storage })
  router.use(upload.fields(fields), async (req: any, res, next) => {
    await Promise.all(
      fields.map(async (element: { name: string; maxCount: number }) => {
        if (req.files[element.name] !== undefined) {
          const file = req.files[element.name][0]
          req[element.name] = file
        }
      }),
    );
    next()
  });
  return router
};

export default fileMiddleware
