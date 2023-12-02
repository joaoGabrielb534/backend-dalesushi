import multer, { diskStorage } from 'multer'
import { resolve } from 'path'
import crypto from 'crypto'

const setupMulter = diskStorage({
  destination: resolve(__dirname, '../../uploads/images'),
  filename: (request, file, callback) => {
    const nameHash = crypto.randomBytes(8).toString('hex')
    const name = `${nameHash}-${file.originalname}`

    return callback(null, name)
  },
})

export const upload = multer({
  storage: setupMulter,
})
