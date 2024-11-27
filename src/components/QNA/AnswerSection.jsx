import styled from "styled-components";
import QNACard from "./QNACard";
import { useEffect, useState } from "react";
import { getReceivedAnswers } from "../../apis/qna";

const AnswerSection = () => {
    const [receviedAnswers, setReceivedAnswers] = useState([]);

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
                <b>
                    {receviedAnswers.length}
                    개의 답변
                </b>
                을 받았어요!
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

const QNASection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 28px;
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
