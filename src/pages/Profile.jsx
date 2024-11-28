// 필요한 라이브러리와 컴포넌트 import
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProfile } from "../apis/user";
import styled from "styled-components";
import { getBackgroundColor, getProfileIcon } from "../components/ProfileCard";
import QuestionSection from "../components/QNA/QuestionSection";
import AnswerSection from "../components/QNA/AnswerSection";

function Profile() {
  // 상태 관리
  const [profile, setProfile] = useState(null);
  const [profileIcon, setProfileIcon] = useState("");
  const [activeMenu, setActiveMenu] = useState("질문");

  // 프로필 아이콘 설정
  useEffect(() => {
    if (!profile) return;
    setProfileIcon(getProfileIcon(profile.id));
  }, [profile]);

  // 프로필 데이터 불러오기
  useEffect(() => {
    async function fetchData() {
      try {
        const profile = await getProfile();
        setProfile(profile);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Wrapper>
        <ContentContainer>
          <UserProfile>
            <ProfileImage id={profile?.id}>{profileIcon}</ProfileImage>
            <UserName>{profile?.username}</UserName>
            <UserBio>{profile?.bio}</UserBio>
          </UserProfile>
          <QNAContainer>
            <Menu>
              <MenuButton
                active={activeMenu === "질문"}
                onClick={() => setActiveMenu("질문")}
              >
                질문함 ✨
              </MenuButton>
              <MenuButton
                active={activeMenu === "답변"}
                onClick={() => setActiveMenu("답변")}
              >
                답변함 💫
              </MenuButton>
            </Menu>
            {activeMenu === "질문" ? <QuestionSection /> : <AnswerSection />}
          </QNAContainer>
        </ContentContainer>
      </Wrapper>
    </>
  );
}

export default Profile;

// 전체 래퍼 스타일링
const Wrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 60px);
  background: #f8fafc;
  overflow: hidden;
`;

// 컨텐츠 컨테이너 스타일링
// 텍스트가 컨테이너를 넘지 않도록 조정
const ContentContainer = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2; // 표시할 줄 수
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  max-width: 100%;
  padding: 10px;
`;

// Q&A 컨테이너 스타일링
const QNAContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

// 메뉴 스타일링
const Menu = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 40px;
  gap: 30px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 10px;
`;

// 메뉴 버튼 스타일링
const MenuButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 600;
  font-family: "Poppins", "Noto Sans KR", sans-serif;
  cursor: pointer;
  border-radius: 20px;
  transition: all 0.2s;
  color: ${(props) =>
    props.active ? "#ff8fab" : "#8f9aab"}; // 더 부드러운 색상으로 변경

  ${(props) =>
    props.active &&
    `
    background-color: #fff0f3;
  `}

  &:hover {
    background-color: ${(props) => (props.active ? "#fff0f3" : "#f8f9fa")};
  }
`;

// 프로필 이미지 스타일링
const ProfileImage = styled.div`
  background-color: ${(props) => getBackgroundColor(props.id)};
  border-radius: 50%;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

// 사용자 이름 스타일링
const UserName = styled.h2`
  font-size: 32px;
  color: #2a2f3c;
  font-weight: 700;
  font-family: "Poppins", "Noto Sans KR", sans-serif;
  margin: 0;
  letter-spacing: 0.5px;
  text-shadow: 1px 1px 2px rgba(255, 143, 171, 0.1); // 부드러운 그림자 효과
`;

// 사용자 소개 스타일링
const UserBio = styled.p`
  font-size: 16px;
  color: #8f9aab; // 부드러운 회색
  font-family: "Poppins", "Noto Sans KR", sans-serif;
  margin: 0;
  max-width: 500px;
  text-align: center;
  line-height: 1.6;
  word-wrap: break-word;
  overflow-wrap: break-word;
  letter-spacing: 0.3px;
`;

// 사용자 프로필 섹션 스타일링
const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 60px;
  padding: 40px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;
