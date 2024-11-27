import styled from "styled-components";
import { getBackgroundColor, getProfileIcon } from "../ProfileCard";
import { useEffect, useState } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const QNACard = ({
  userId,
  username,
  content,
  received,
  answer,
  questionId,
}) => {
  const navigate = useNavigate();
  const [profileIcon, setProfileIcon] = useState("");

  useEffect(() => {
    if (!userId) return;
    setProfileIcon(getProfileIcon(userId));
  }, [userId]);

  const handleAnswer = () => {
    console.log(questionId);
    navigate("/answer", {
      state: { user: { id: userId }, questionId: questionId },
    });
  };

  return (
    <CardContainer>
      <UserInfo>
        <CardProfileImage id={userId}>{profileIcon}</CardProfileImage>
        <CardUserName>{username}</CardUserName>
      </UserInfo>
      <RightSection>
        <CardContent>{content}</CardContent>
        {answer === null && received && (
          <Button onClick={handleAnswer}>답변하기</Button>
        )}
      </RightSection>
    </CardContainer>
  );
};

export default QNACard;

const RightSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
`;

const CardProfileImage = styled.div`
  background-color: ${(props) => getBackgroundColor(props.id)};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
`;

const CardContent = styled.div`
  margin-left: 40px;
  font-size: 20px;
  color: #454545;
  font-weight: 300;
`;

const CardContainer = styled.div`
  display: flex;
  padding: 15px 16px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const CardUserName = styled.h3`
  font-size: 20px;
`;
