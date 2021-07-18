import path from 'path';

const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, arg: boolean
    ) => void,
  ) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.svg' && ext !== '.mp3') {
      callback(new Error('File type is not supported'), false);
      return;
    }
    callback(null, true);
  },
});

export default upload;
