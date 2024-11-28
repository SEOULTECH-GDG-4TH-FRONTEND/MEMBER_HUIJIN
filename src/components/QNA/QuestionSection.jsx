// 필요한 라이브러리와 컴포넌트 import
import styled from "styled-components";
import QNACard from "./QNACard";
import { useEffect, useState } from "react";
import { getReceivedQuestions, getSentQuestions } from "../../apis/qna";

const QuestionSection = () => {
  // 상태 관리
  const [sentQuestions, setSentQuestions] = useState([]);
  const [receivedQuestions, setReceivedQuestions] = useState([]);

  // 데이터 불러오기
  useEffect(() => {
    async function fetchData() {
      try {
        const sentQuestions = await getSentQuestions();
        const receivedQuestions = await getReceivedQuestions();
        setSentQuestions(sentQuestions);
        setReceivedQuestions(receivedQuestions);
        console.log(sentQuestions, receivedQuestions);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <QNASection>
        <Title>
          총{" "}
          <HighlightCount>
            {sentQuestions.length}
            개의 질문
          </HighlightCount>
          을 했어요! 📨
        </Title>
        <CardList>
          {sentQuestions.map((question) => (
            <QNACard
              key={question.id}
              userId={question.targetId}
              username={question.target}
              content={question.content}
              questionId={question.questionId}
            />
          ))}
        </CardList>
      </QNASection>
      <QNASection>
        <Title>
          총{" "}
          <HighlightCount>
            {receivedQuestions.length}
            개의 질문
          </HighlightCount>
          을 받았어요! 📩
        </Title>
        <CardList>
          {receivedQuestions.map((question) => (
            <QNACard
              key={question.id}
              userId={question.authorId}
              username={question.author}
              content={question.content}
              questionId={question.questionId}
              answer={question.answer}
              received
            />
          ))}
        </CardList>
      </QNASection>
    </>
  );
};

export default QuestionSection;

// QNA 섹션 컨테이너 스타일링
const QNASection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 64px;
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

// 카드 리스트 스타일링
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
