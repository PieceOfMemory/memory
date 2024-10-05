import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicGroupList from './group/components/PublicGroupList';
import GroupCreate from './group/components/GroupCreate';
import GroupCreateSuccess from './group/components/GroupCreateSuccess';
import GroupDetail from './group/components/GroupDetail';
import ConfirmationModal from './group/components/ConfirmationModal';
import PostCreate from './post/PostCreate';
import PostDetail from './post/PostDetail';
import PostEdit from './post/PostEdit'; // 추억 수정 컴포넌트 임포트
import PostDelete from './post/PostDelete'; // 추억 삭제 컴포넌트 임포트
import CommentCreate from './comment/CommentCreate'; // 댓글 작성 컴포넌트 임포트
import CommentEdit from './comment/CommentEdit'; // 댓글 수정 컴포넌트 임포트
import CommentDelete from './comment/CommentDelete'; // 댓글 삭제 컴포넌트 임포트

import GroupEdit from './group/components/GroupEdit';
import GroupDelete from './group/components/GroupDelete';

function App() {
  // 모달 표시를 제어하는 상태
  const [showModal, setShowModal] = useState(false);

  // 모달 열기/닫기 핸들러
  const handleCloseModal = () => setShowModal(false);

  return (
    <Router>
      <div>
        {/* Routes 설정: 페이지 간 이동을 위한 라우팅 */}
        <Routes>
          {/* 공개 그룹 목록 페이지 */}
          <Route path="/" element={<PublicGroupList />} />
          
          {/* 그룹 만들기 페이지 */}
          <Route path="/GroupCreate" element={<GroupCreate />} />
          
          {/* 그룹 만들기 성공 페이지 */}
          <Route path="/GroupCreateSuccess" element={<GroupCreateSuccess />} />
          
          {/* 그룹 상세 페이지 */}
          <Route path="/group/:groupId" element={<GroupDetail />} />
          
          {/* 추억 작성 페이지 */}
          <Route path="/PostCreate" element={<PostCreate />} />

          {/* 추억 상세 페이지 */}
          <Route path="/posts/:memoryId" element={<PostDetail />} />

          {/* 추억 수정 페이지 */}
          <Route path="/PostEdit/:memoryId" element={<PostEdit />} />

          {/* 추억 삭제 페이지 */}
          <Route path="/PostDelete/:memoryId" element={<PostDelete />} />

          {/* 댓글 작성 페이지 */}
          <Route path="/CommentCreate" element={<CommentCreate />} />

          {/* 댓글 수정 페이지 */}
          <Route path="/CommentEdit/:commentId" element={<CommentEdit />} />

          {/* 댓글 삭제 페이지 */}
          <Route path="/CommentDelete/:commentId" element={<CommentDelete />} />

          {/* 그룹 수정 페이지 */}
          <Route path="/GroupEdit/:groupId" element={<GroupEdit />} />

          {/* 그룹 삭제 페이지 */}
          <Route path="/GroupDelete/:groupId" element={<GroupDelete />} />
        </Routes>

        {/* 모달 표시: showModal이 true일 때 모달을 렌더링 */}
        {showModal && (
          <ConfirmationModal
            title="확인"
            message="작업이 성공적으로 완료되었습니다."
            onClose={handleCloseModal}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
