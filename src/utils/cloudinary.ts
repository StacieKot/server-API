const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'stacie-kot',
  api_key: 171578559596356,
  api_secret: 'XnRsvCQG9lbjEdkdFiq16hUPsi0',
});

export default cloudinary;
