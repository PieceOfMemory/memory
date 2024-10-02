import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Switch 대신 Routes 사용
import PublicGroupList from './group/components/PublicGroupList'; // 공개 그룹 목록 페이지
import GroupCreate from './group/components/GroupCreate'; // 그룹 만들기 페이지
import GroupCreateSuccess from './group/components/GroupCreateSuccess'; // 그룹 만들기 성공 페이지
import GroupDetail from './group/components/GroupDetail'; // 그룹 상세 페이지
import ConfirmationModal from './group/components/ConfirmationModal'; // 모달 컴포넌트

function App() {
  // 모달 표시를 제어하는 상태
  const [showModal, setShowModal] = useState(false);

  // 모달 열기/닫기 핸들러
  const handleCloseModal = () => setShowModal(false);

  return (
    <Router>
      <div>
        {/* Routes를 사용하여 각 페이지 이동 */}
        <Routes>
          {/* 루트 경로에서 공개 그룹 목록 페이지를 렌더링 */}
          <Route exact path="/" element={<PublicGroupList />} /> 
          {/* 그룹 만들기 페이지 */}
          <Route path="/GroupCreate" element={<GroupCreate />} /> 
          {/* 그룹 만들기 성공 페이지 */}
          <Route path="/GroupCreateSuccess" element={<GroupCreateSuccess />} />
          {/* 그룹 상세 페이지 */}
          <Route path="/group/:groupId" element={<GroupDetail />} />
        </Routes>

        {/* 조건부로 모달 렌더링 */}
        {showModal && (
          <ConfirmationModal
            title="확인"
            message="작업이 성공적으로 완료되었습니다."
            onClose={handleCloseModal}
          />
        )}
      </div>

      {/* 임시로 모달 열기 버튼 추가 (필요 시 삭제 가능) */}
      {/*<button onClick={() => setShowModal(true)}>모달 열기</button>*/}
    </Router>
  );
}

export default App;
