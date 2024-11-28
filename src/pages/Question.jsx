import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { createQuestion } from "../apis/qna";
import { getBackgroundColor, getProfileIcon } from "../components/ProfileCard";

function Question() {
  // 로그인 상태와 네비게이션을 위한 훅
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // location state에서 사용자 정보 추출
  const { user } = location.state || {};

  // 상태 관리
  const [profileIcon, setProfileIcon] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 질문 내용 최대 길이 제한
  const MAX_CONTENT_LENGTH = 1500;

  // 비로그인 사용자 리디렉션
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // 사용자 프로필 아이콘 설정
  useEffect(() => {
    if (user?.id) {
      setProfileIcon(getProfileIcon(user.id));
    }
  }, [user?.id]);

  // 사용자 정보 없을 경우 에러 표시
  if (!user) {
    return <div>유저 정보가 없습니다.</div>;
  }

  // 질문 내용 유효성 검사
  const validateContent = () => {
    if (!content.trim()) {
      alert("질문 내용을 입력해주세요.");
      return false;
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      alert(`질문은 ${MAX_CONTENT_LENGTH}자를 초과할 수 없습니다.`);
      return false;
    }
    return true;
  };

  // 질문 제출 핸들러
  const handleSubmit = async () => {
    if (!validateContent() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const questionData = {
        questionId: Date.now(),
        content: content.trim(),
      };

      await createQuestion({
        targetId: user.id,
        ...questionData,
      });

      alert("질문을 성공적으로 작성했습니다.");
      navigate("/");
    } catch (error) {
      console.error("질문 작성 실패:", error);
      alert("질문을 작성하는 데 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      {/* 전체 페이지 컨테이너 */}
      <PageContainer>
        {/* 메인 질문 폼 컨테이너 */}
        <QuestionContainer>
          <Logo src="/logo.svg" alt="logo" />
          <Title>질문하기 🙋🏻</Title>
          <Subtitle>궁금한 점을 자유롭게 물어보세요</Subtitle>

          {/* 프로필 카드 영역 */}
          <ProfileCard>
            <ProfileImage id={user.id}>{profileIcon}</ProfileImage>
            <UserInfo>
              <UserName>{user.username}</UserName>
              <UserBio>{user.bio}</UserBio>
            </UserInfo>
          </ProfileCard>

          {/* 질문 입력 영역 */}
          <QuestionAreaContainer>
            <QuestionArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="질문을 입력해주세요..."
              maxLength={MAX_CONTENT_LENGTH}
            />
            <CharacterCount
              $isNearLimit={content.length > MAX_CONTENT_LENGTH * 0.9}
            >
              {content.length} / {MAX_CONTENT_LENGTH}
            </CharacterCount>
          </QuestionAreaContainer>

          {/* 질문하기 버튼 */}
          <Button
            onClick={handleSubmit}
            variant="questioning"
            disabled={isSubmitting}
          >
            {isSubmitting ? "질문 작성 중..." : "질문하기"}
          </Button>
        </QuestionContainer>

        {/* 배경 장식 요소들 */}
        <BackgroundCircle1 />
        <BackgroundCircle2 />
        <BackgroundCircle3 />
        <BackgroundCircle4 />
      </PageContainer>
    </>
  );
}

// 스타일 컴포넌트 정의
// 전체 페이지 컨테이너
const PageContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 70px); // Navbar 높이를 고려한 전체 높이
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8fafc;
  font-family: "Poor Story", "Poppins", sans-serif;
  position: relative;
  overflow: hidden;
  padding: 20px;
`;

// 메인 질문 폼 컨테이너
const QuestionContainer = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 60px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  position: relative;
  z-index: 1; // 배경 원들 위에 표시
`;

// 로고 이미지
const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 24px;
`;

// 메인 타이틀
const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
`;

// 서브 타이틀
const Subtitle = styled.p`
  font-size: 16px;
  color: #64748b;
  margin-bottom: 32px;
`;

// 프로필 카드 컨테이너
const ProfileCard = styled.div`
  display: flex;
  padding: 20px;
  border-radius: 16px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;
  border: 1px solid #f0f0f0;
`;

// 프로필 이미지
const ProfileImage = styled.div`
  background-color: ${(props) => getBackgroundColor(props.id)};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
`;

// 사용자 정보 컨테이너
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  justify-content: center;
  gap: 8px;
`;

// 사용자 이름
const UserName = styled.h2`
  font-size: 20px;
  color: #1e293b;
  font-weight: 600;
`;

// 사용자 소개
const UserBio = styled.p`
  font-size: 14px;
  color: #64748b;
`;

// 질문 입력 영역 컨테이너
const QuestionAreaContainer = styled.div`
  position: relative;
  margin-bottom: 32px;
`;

// 질문 입력 텍스트 영역
const QuestionArea = styled.textarea`
  resize: none;
  border-radius: 16px;
  height: 250px;
  width: 100%;
  border: 1px solid #e2e8f0;
  padding: 24px;
  font-size: 16px;
  background: #f8fafc;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #94a3b8;
    background: white;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

// 글자 수 카운터
const CharacterCount = styled.div`
  position: absolute;
  bottom: 16px;
  right: 24px;
  font-size: 14px;
  color: ${(props) => (props.$isNearLimit ? "#ff4444" : "#94a3b8")};
`;

// 배경 장식용 원들
// 분홍색 원
const BackgroundCircle1 = styled.div`
  position: fixed;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff69b433, #ff149433);
  top: 100px;
  right: -100px;
  z-index: 0;
`;

// 하늘색 원
const BackgroundCircle2 = styled.div`
  position: fixed;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: linear-gradient(135deg, #87ceeb33, #00bfff33);
  bottom: -150px;
  left: -50px;
  z-index: 0;
`;

// 연한 보라색 원
const BackgroundCircle3 = styled.div`
  position: fixed;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e6e6fa44, #dda0dd44);
  top: 50%;
  right: 15%;
  z-index: 0;
`;

// 연한 살구색 원
const BackgroundCircle4 = styled.div`
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffdab944, #ffe4b544);
  top: 15%;
  left: 15%;
  z-index: 0;
`;

export default Question;
