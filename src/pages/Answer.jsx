// 필요한 라이브러리와 컴포넌트 import
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { createAnswer } from "../apis/qna";
import { getBackgroundColor, getProfileIcon } from "../components/ProfileCard";
import { getUser } from "../apis/user";

function Answer() {
  // 상태 관리
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, questionId } = location.state || {};
  const [profileIcon, setProfileIcon] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [content, setContent] = useState("");

  // 사용자 정보 가져오기
  useEffect(() => {
    const fecthUserInfo = async () => {
      try {
        const response = await getUser(user.id);
        setProfileIcon(getProfileIcon(response.id));
        setUserInfo(response);
      } catch (error) {
        console.error(error);
      }
    };
    fecthUserInfo();
  }, [user.id]);

  // 로그인 상태 체크
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!user) {
    return <div>유저 정보가 없습니다.</div>;
  }

  // 답변 제출 처리
  const handleSubmit = async () => {
    try {
      await createAnswer({ questionId, content });
      alert("답변을 성공적으로 작성했습니다.");
      navigate("/");
    } catch {
      alert("답변을 작성하는 데 실패했습니다.");
    }
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <ContentContainer>
          <Title>답변을 작성해주세요 📝</Title>
          <CardContainer>
            <ProfileImage id={userInfo.id}>{profileIcon}</ProfileImage>
            <UserInfo>
              <UserName>{userInfo.username}</UserName>
              <UserBio>{userInfo.bio}</UserBio>
            </UserInfo>
          </CardContainer>
          <QuestionArea
            onChange={(e) => setContent(e.target.value)}
            placeholder="답변을 입력해주세요..."
          />
          <Button onClick={handleSubmit} variant="answering">
            답변하기
          </Button>
        </ContentContainer>
        <BackgroundCircle1 />
        <BackgroundCircle2 />
        <BackgroundCircle3 />
      </PageWrapper>
    </>
  );
}

export default Answer;

// 페이지 전체 래퍼 스타일링
const PageWrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 60px);
  background: #f8fafc;
  overflow: hidden;
`;

// 컨텐츠 컨테이너 스타일링
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 120px;
  position: relative;
  z-index: 2;
`;

// 제목 스타일링
const Title = styled.div`
  font-size: 32px;
  color: #4a5056;
  font-weight: 600;
  font-family: "Poor Story", "Poppins", sans-serif;
  margin-bottom: 32px;
`;

// 프로필 카드 컨테이너 스타일링
const CardContainer = styled.div`
  display: flex;
  padding: 20px 24px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  margin-bottom: 32px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px -1px rgb(0 0 0 / 0.15);
  }
`;

// 프로필 이미지 스타일링
const ProfileImage = styled.div`
  background-color: ${(props) => getBackgroundColor(props.id)};
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

// 사용자 이름 스타일링
const UserName = styled.h2`
  font-size: 20px;
  color: #2a2f3c;
  font-family: "Poor Story", "Poppins", sans-serif;
  font-weight: 600;
  margin: 0;
`;

// 사용자 소개 스타일링
const UserBio = styled.p`
  font-size: 16px;
  color: #6b7280;
  font-family: "Poor Story", "Poppins", sans-serif;
  margin: 0;
`;

// 사용자 정보 컨테이너 스타일링
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  justify-content: center;
  gap: 8px;
`;

// 답변 입력 영역 스타일링
const QuestionArea = styled.textarea`
  resize: none;
  border-radius: 16px;
  height: 300px;
  border: 1px solid #e5e7eb;
  padding: 24px;
  margin-bottom: 32px;
  font-family: "Poor Story", "Poppins", sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #4a5056;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #f797b0;
    box-shadow: 0 0 0 2px rgba(247, 151, 176, 0.1);
  }
`;

// 배경 장식용 원들
const BackgroundCircle1 = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f797b033, #ff149333);
  top: -100px;
  right: -100px;
  z-index: 1;
`;

const BackgroundCircle2 = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6b9fff33, #4a7ed933);
  bottom: -100px;
  left: -100px;
  z-index: 1;
`;

const BackgroundCircle3 = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(135deg, #98fb9833, #90ee9033);
  top: 40%;
  left: 30%;
  z-index: 1;
`;
