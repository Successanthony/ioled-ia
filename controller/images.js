const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './resources');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname );
  }
});


exports.chargeImage = (req, res) => {
    const upload = multer({ storage: storage }).single('file')

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).send(req.file);
    });
};
