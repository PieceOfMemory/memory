const bodyParser = require('body-parser');
const groupRoutes = require('./routes/groupRoutes'); // 그룹 라우트 불러오기
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const express = require('express');

const app = express();
app.use(bodyParser.json());

// 그룹 관련 API 라우트 설정
app.use('/api/groups', groupRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);


app.listen(3000, () => {
    console.log('Server running on port 3000');
});