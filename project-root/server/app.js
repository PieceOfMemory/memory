const bodyParser = require('body-parser');
const groupRoutes = require('./routes/groupRoutes'); // 그룹 라우트 불러오기
const postRoutes = require('./routes/postRoutes');
const path = require('path');
const commentRoutes = require('./routes/commentRoutes');
const imageRoutes = require('./routes/imageRoutes');
const badgeRoutes = require('./routes/badgeRoutes');
const express = require('express');
const cors = require('cors');
const { group } = require('console');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(express.urlencoded({ extended: true }));
app.use(cors());

// 그룹 관련 API 라우트 설정
app.get('/', (req, res, next) => {
    // 기본 파라미터를 설정하여 listGroups 함수 호출
    req.query.page = req.query.page || 1;           // 기본값 1
    req.query.pageSize = req.query.pageSize || 10;  // 기본값 10
    req.query.sortBy = req.query.sortBy || 'latest';
    req.query.isPublic = req.query.isPublic || 'true';

    // groupController의 listGroups 호출
    groupController.listGroups(req, res, next);
});


app.use('/api/groups', groupRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use('/api', imageRoutes);
app.use('/images', express.static(path.join(__dirname, 'images'))); // 업로드된 이미지를 정적 파일로 제공
app.use('/api', badgeRoutes);
app.use('/api', searchRoutes); // 검색 라우터 추가

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});