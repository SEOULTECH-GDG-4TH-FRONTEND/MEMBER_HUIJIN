import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 통일된 색상 변수
const colors = {
  background: {
    peach: "#FFE5B4", // 연한 살구색
    mint: "#B4F0E0", // 민트
    lavender: "#E6E6FA", // 라벤더
    coral: "#FFD4DB", // 코랄
    vanilla: "#F3E5AB", // 바닐라
    skyBlue: "#A5D8FF", // 하늘색
    sage: "#D4E2D4", // 세이지
    rose: "#FFE4E1", // 로즈
    lilac: "#DCD0FF", // 라일락
    lemon: "#FFFACD", // 레몬
  },
  border: "#f0f0f0",
  borderHover: "#e2e8f0",
  shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  shadowHover: "0 6px 12px -2px rgb(0 0 0 / 0.15)",
};

export const getBackgroundColor = (id) => {
  switch (id % 10) {
    case 0:
      return colors.background.peach;
    case 1:
      return colors.background.mint;
    case 2:
      return colors.background.lavender;
    case 3:
      return colors.background.coral;
    case 4:
      return colors.background.vanilla;
    case 5:
      return colors.background.skyBlue;
    case 6:
      return colors.background.sage;
    case 7:
      return colors.background.rose;
    case 8:
      return colors.background.lilac;
    case 9:
      return colors.background.lemon;
    default:
      return colors.background.peach;
  }
};
export const getProfileIcon = (id) => {
  switch (id % 10) {
    case 0:
      return "🎵"; // 벚꽃
    case 1:
      return "💫"; // 나비
    case 2:
      return "🌟"; // 별
    case 3:
      return "🌈"; // 무지개
    case 4:
      return "🌻"; // 해바라기
    case 5:
      return "✨"; // 반짝이
    case 6:
      return "🍀"; // 클로버
    case 7:
      return "🌙"; // 달
    case 8:
      return "💎"; // 하와이언 꽃
    case 9:
      return "🌊"; // 파도
    default:
      return "⭐";
  }
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 16px;
  background-color: white;
  box-shadow: ${colors.shadow};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${colors.border};
  font-family: "Poppins", sans-serif;

  // 마우스 호버 시 약간의 움직임과 그림자 효과 적용
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${colors.shadowHover};
    border-color: ${colors.borderHover};
  }
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
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const UserName = styled.h2`
  font-size: 20px;
  margin: 0;
  color: #2a2f3c;
  font-weight: 600;
  font-family: "Poor Story", "Poppins", sans-serif;
`;

const UserBio = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 10px 0;
  line-height: 1.6;
  font-family: "Poor Story", "Poppins", sans-serif;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const QuestionCount = styled.p`
  font-size: 15px;
  color: #4a5056;
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid ${colors.border};
  font-family: "Poor Story", "Poppins", sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ProfileCard = (props) => {
  const [profileIcon, setProfileIcon] = useState("");

  useEffect(() => {
    setProfileIcon(getProfileIcon(props.id));
  }, [props.id]);

  return (
    <CardContainer onClick={props.onClick}>
      <ProfileImage id={props.id}>{profileIcon}</ProfileImage>
      <UserName>{props.name}</UserName>
      <UserBio>{props.bio}</UserBio>
      <QuestionCount>💬 받은 질문 {props.questionCount}개</QuestionCount>
    </CardContainer>
  );
};

export default ProfileCard;
