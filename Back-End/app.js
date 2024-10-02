const bodyParser = require('body-parser');
const groupRoutes = require('./routes/groupRoutes'); // 그룹 라우트 불러오기
const postRoutes = require('./routes/postRoutes');
const path = require('path');
const commentRoutes = require('./routes/commentRoutes');
const imageRoutes = require('./routes/imageRoutes');
const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// 그룹 관련 API 라우트 설정
app.use('/api/groups', groupRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);

// 정적 파일 제공 설정 (업로드된 이미지 접근을 위해 필요)
app.use('/images', express.static(path.join(__dirname, 'images')));

// 이미지 업로드 라우터 사용
app.use('/api/images', imageRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});