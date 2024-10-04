const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images/'); // 이미지 파일을 저장할 폴더 설정
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // 파일 이름을 현재 시간 + 확장자로 설정
    }
});

const upload = multer({ storage: storage });

module.exports = upload;