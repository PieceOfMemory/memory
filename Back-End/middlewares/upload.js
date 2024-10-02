const multer = require('multer');
const path = require('path');

// 이미지 파일을 저장할 폴더와 파일명 설정
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images/'); // 업로드된 파일을 저장할 디렉토리 설정
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;