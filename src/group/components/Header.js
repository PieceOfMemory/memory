// src/group/components/Header.js
import React from 'react';
import './Header.css'; // 헤더 스타일 파일 가져오기


function Header() {
  return (
    <div className="header-container">
      <h1 className="title">조각집</h1>
      <button className="create-group-button">그룹 만들기</button>
    </div>
  );
}

export default Header;
