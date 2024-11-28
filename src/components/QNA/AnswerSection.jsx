// 필요한 라이브러리와 컴포넌트 import
import styled from "styled-components";
import QNACard from "./QNACard";
import { useEffect, useState } from "react";
import { getReceivedAnswers } from "../../apis/qna";

const AnswerSection = () => {
  const [receviedAnswers, setReceivedAnswers] = useState([]);

  // 답변 데이터 불러오기
  useEffect(() => {
    async function fetchData() {
      try {
        const receivedAnswers = await getReceivedAnswers();
        setReceivedAnswers(receivedAnswers);
        console.log(receivedAnswers);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <QNASection>
      <Title>
        총{" "}
        <HighlightCount>
          {receviedAnswers.length}
          개의 답변
        </HighlightCount>
        을 받았어요! 📬
      </Title>
      <CardList>
        {receviedAnswers.map((answer) => (
          <QNACard
            key={answer.id}
            userId={answer.authorId}
            username={answer.author}
            content={answer.content}
          />
        ))}
      </CardList>
    </QNASection>
  );
};

export default AnswerSection;

// QNA 섹션 컨테이너 스타일링
const QNASection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 10px;
`;

// 타이틀 스타일링
const Title = styled.h2`
  font-size: 35px;
  font-family: "Poor Story", "Poppins", sans-serif;
  color: #4a5056;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// 강조 숫자 스타일링
const HighlightCount = styled.span`
  font-family: "Poor Story", "Poppins", sans-serif;
  font-size: 40px;
  color: #f797b0;
  font-weight: 700;
  padding: 0 4px;
`;

// 카드 리스트 컨테이너 스타일링
const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
