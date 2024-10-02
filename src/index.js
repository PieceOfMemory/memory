import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // 필요시 CSS 파일 추가
import App from './app';  // App 컴포넌트 불러오기

ReactDOM.render(
  <React.StrictMode>
    <App />  {/* App 컴포넌트를 렌더링 */}
  </React.StrictMode>,
  document.getElementById('root')  // index.html의 'root' div에 렌더링
);
