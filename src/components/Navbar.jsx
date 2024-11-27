import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { logout } from "../apis/user";

// 네비게이션 바의 전체 컨테이너 스타일링
// - flex로 레이아웃 구성
// - 밝은 배경색과 그림자 효과로 시각적 깊이감 추가
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between; // 로고와 메뉴 아이템을 양끝으로 배치
  align-items: center; // 세로 중앙 정렬
  padding: 1rem;
  background-color: #fcfcfc; // 밝은 배경색
  color: #373737; // 기본 텍스트 색상
  box-shadow: 0 4px 6.6px rgba(0, 0, 0, 0.1); // 미묘한 그림자 효과
`;

// 브랜드/로고 영역 스타일링
const Brand = styled.div`
  font-size: 1.5rem; // 로고 텍스트 크기
`;

// 메뉴 리스트 컨테이너
// - flex로 가로 배치
// - gap으로 메뉴 아이템 간격 조정
const Menu = styled.ul`
  list-style: none; // 기본 리스트 스타일 제거
  display: flex; // 가로 배치
  gap: 40px; // 메뉴 아이템 간 간격
`;

// 개별 메뉴 아이템 스타일링
const MenuItem = styled.li`
  // 모든 링크에 적용되는 기본 스타일
  a {
    color: #373737;
    font-weight: 700;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 6px;
    border: 2px solid;
    transition: all 0.3s;
  }

  // href 속성 선택자를 사용해 Profile 링크만 선택
  // [href="/profile"]: 해당 경로를 가진 링크에만 스타일 적용
  a[href="/profile"] {
    border-color: #ffb6c1; // 분홍색 테두리
    background-color: #ffe4e8; // 연한 분홍 배경
    &:hover {
      background-color: #ffb6c1; // 호버 시 진한 분홍으로 변경
    }
  }

  // href 속성 선택자를 사용해 Logout 링크만 선택
  // [href="/login"]: 로그인 경로를 가진 링크에만 스타일 적용
  a[href="/login"] {
    border-color: #87ceeb; // 하늘색 테두리
    background-color: #e6f3ff; // 연한 하늘 배경
    &:hover {
      background-color: #87ceeb; // 호버 시 진한 하늘색으로 변경
    }
  }
`;

function Navbar() {
  // 로그아웃 상태 관리 훅
  const { setLogout } = useAuth();

  // 로그아웃 핸들러 함수
  const handleLogout = async () => {
    try {
      await logout(); // 로그아웃 API 호출
      alert("로그아웃 성공");
    } catch (error) {
      alert("로그아웃 실패");
    }
    setLogout(); // 로그아웃 상태 업데이트
  };

  return (
    <NavbarContainer>
      <Brand>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <img src="/assets/logo.png" alt="" width="44" height="44" />
        </Link>
      </Brand>
      <Menu>
        <MenuItem>
          <Link to="/profile">Profile</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </NavbarContainer>
  );
}

export default Navbar;
