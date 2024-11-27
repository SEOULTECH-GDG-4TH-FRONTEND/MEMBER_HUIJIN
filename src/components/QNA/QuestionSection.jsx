import styled from "styled-components";
import QNACard from "./QNACard";
import { useEffect, useState } from "react";
import { getReceivedQuestions, getSentQuestions } from "../../apis/qna";

const QuestionSection = () => {
    const [sentQuestions, setSentQuestions] = useState([]);
    const [receivedQuestions, setReceivedQuestions] = useState([]);

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
                    <b>
                        {sentQuestions.length}
                        개의 질문
                    </b>
                    을 했어요!
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
                    총 <b>{receivedQuestions.length}개의 질문</b>을 받았어요!
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

const QNASection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 28px;
    margin-bottom: 64px;
`;

const Title = styled.h2`
    font-size: 28px;
    b {
        color: #0644e1;
    }
`;

const CardList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 28px;
`;
