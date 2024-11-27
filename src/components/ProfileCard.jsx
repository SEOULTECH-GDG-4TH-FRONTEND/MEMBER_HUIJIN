// ProfileCard.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const getBackgroundColor = (id) => {
    switch (
        id % 3 // id에 따라 다른 배경색을 지정
    ) {
        case 0:
            return "#FFDDC1";
        case 1:
            return "#AEEEEE";
        case 2:
            return "#FFD1DC";
        default:
            return "#AEEEE3";
    }
};

export const getProfileIcon = (id) => {
    switch (
        id % 3 // id에 따라 다른 배경색을 지정
    ) {
        case 0:
            return "😎";
        case 1:
            return "😀";
        case 2:
            return "🤔";
        default:
            return "🤗";
    }
};

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px 16px;
    border-radius: 16px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
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
    margin-bottom: 15px;
`;

const UserName = styled.h2`
    font-size: 20px;
    margin: 0;
    color: #333;
`;

const UserBio = styled.p`
    font-size: 14px;
    color: #666;
    margin: 10px 0;
`;

const QuestionCount = styled.p`
    font-size: 14px;
    color: #999;
    margin-top: auto;
`;

// const ProfileCard = ({ id, name, bio, questionCount }) => {
//     const [profileIcon, setProfileIcon] = useState("");
//     const getProfileIcon = (id) => {
//         switch (
//             id % 3 // id에 따라 다른 배경색을 지정
//         ) {
//             case 0:
//                 return "😎";
//             case 1:
//                 return "😀";
//             case 2:
//                 return "🤔";
//             default:
//                 return "🤗";
//         }
//     };

//     useEffect(() => {
//         setProfileIcon(getProfileIcon(id));
//     }, [id]);

//     return (
//         <CardContainer>
//             <ProfileImage id={id}>{profileIcon}</ProfileImage>
//             <UserName>{name}</UserName>
//             <UserBio>{bio}</UserBio>
//             <QuestionCount> 💬 받은 질문 {questionCount}개</QuestionCount>
//         </CardContainer>
//     );
// };

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
            <QuestionCount> 💬 받은 질문 {props.questionCount}개</QuestionCount>
        </CardContainer>
    );
};

export default ProfileCard;
