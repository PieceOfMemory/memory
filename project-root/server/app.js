const bodyParser = require('body-parser');
const groupRoutes = require('./routes/groupRoutes'); // 그룹 라우트 불러오기
const postRoutes = require('./routes/postRoutes');
const path = require('path');
const commentRoutes = require('./routes/commentRoutes');
const imageRoutes = require('./routes/imageRoutes');
const badgeRoutes = require('./routes/badgeRoutes');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(express.urlencoded({ extended: true }));
app.use(cors());

// 그룹 관련 API 라우트 설정
app.use('/api/groups', groupRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use('/api', imageRoutes);
app.use('/images', express.static(path.join(__dirname, 'images'))); // 업로드된 이미지를 정적 파일로 제공
app.use('/api', badgeRoutes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});