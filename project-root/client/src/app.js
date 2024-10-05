import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicGroupList from './group/components/PublicGroupList';
import GroupCreate from './group/components/GroupCreate';
import GroupCreateSuccess from './group/components/GroupCreateSuccess';
import GroupDetail from './group/components/GroupDetail';
import ConfirmationModal from './group/components/ConfirmationModal';
import PostCreate from './post/PostCreate';


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
