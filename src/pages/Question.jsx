import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { createQuestion } from "../apis/qna";
import { getBackgroundColor, getProfileIcon } from "../components/ProfileCard";

function Question() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {};
  const [profileIcon, setProfileIcon] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 입력 길이 제한 추가
  const MAX_CONTENT_LENGTH = 1500;

  // 로그인 되어 있는지 확인
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (user?.id) {
      setProfileIcon(getProfileIcon(user.id));
    }
  }, [user?.id]);

  if (!user) {
    return <div>유저 정보가 없습니다.</div>;
  }

  // 유효한 내용인지 확인하는 로직
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

  const handleSubmit = async () => {
    if (!validateContent() || isSubmitting) return;

    try {
      setIsSubmitting(true);

      // API 스펙에 맞게 데이터 구조화
      const questionData = {
        questionId: Date.now(), // 임시 ID 생성 (실제로는 서버에서 생성)
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
      <Wrapper>
        <Title>🙋🏻 질문할게요!</Title>
        <CardContainer>
          <ProfileImage id={user.id}>{profileIcon}</ProfileImage>
          <UserInfo>
            <UserName>{user.username}</UserName>
            <UserBio>{user.bio}</UserBio>
          </UserInfo>
        </CardContainer>
        {/* [수정] 텍스트 영역을 컨테이너로 감싸서 글자 수 표시 추가 */}
        <QuestionAreaContainer>
          <QuestionArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="질문을 입력해주세요..." // [추가] placeholder
            maxLength={MAX_CONTENT_LENGTH} // [추가] 최대 길이 제한
          />
          {/* [추가] 글자 수 카운터 */}
          <CharacterCount
            $isNearLimit={content.length > MAX_CONTENT_LENGTH * 0.9}
          >
            {content.length} / {MAX_CONTENT_LENGTH}
          </CharacterCount>
        </QuestionAreaContainer>
        {/* [수정] 제출 중 상태에 따른 버튼 비활성화 및 텍스트 변경 */}
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "질문 작성 중..." : "질문하기"}
        </Button>
      </Wrapper>
    </>
  );
}

export default Question;

const Wrapper = styled.div`
  display: flex;
  padding: 50px 85px;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 32px;
  color: #454545;
  font-weight: 700;
`;

const CardContainer = styled.div`
  display: flex;
  padding: 15px 16px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-top: 42px;
  margin-bottom: 26px;
`;

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

const UserName = styled.h2`
  font-size: 20px;
  color: #333;
`;

const UserBio = styled.p`
  font-size: 14px;
  color: #666;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  justify-content: center;
  gap: 5px;
`;

const QuestionAreaContainer = styled.div`
  position: relative;
  margin-bottom: 42px;
`;

// [수정] 텍스트 영역 스타일 개선
const QuestionArea = styled.textarea`
  resize: none;
  border-radius: 16px;
  height: 309px;
  width: 100%;
  border: 1px solid #a0a0a0;
  padding: 31px 27px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #666;
  }

  &::placeholder {
    color: #999;
  }
`;

// [추가] 글자 수 카운터 스타일
const CharacterCount = styled.div`
  position: absolute;
  bottom: 10px;
  right: 15px;
  font-size: 14px;
  color: ${(props) => (props.$isNearLimit ? "#ff4444" : "#666")};
`;
