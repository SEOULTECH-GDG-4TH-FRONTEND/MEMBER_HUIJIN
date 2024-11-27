import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProfile } from "../apis/user";
import styled from "styled-components";
import { getBackgroundColor, getProfileIcon } from "../components/ProfileCard";
import QuestionSection from "../components/QNA/QuestionSection";
import AnswerSection from "../components/QNA/AnswerSection";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [profileIcon, setProfileIcon] = useState("");
    const [activeMenu, setActiveMenu] = useState("질문");

    useEffect(() => {
        if (!profile) return;
        setProfileIcon(getProfileIcon(profile.id));
    }, [profile]);

    useEffect(() => {
        async function fetchData() {
            try {
                const profile = await getProfile();
                setProfile(profile);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);
    return (
        <>
            <Navbar />
            <Wrapper>
                <UserProfile>
                    <ProfileImage id={profile?.id}>{profileIcon}</ProfileImage>
                    <UserName>{profile?.username}</UserName>
                    <UserBio>{profile?.bio}</UserBio>
                </UserProfile>
                <QNAContainer>
                    <Menu>
                        <MenuButton
                            active={activeMenu === "질문"}
                            onClick={() => setActiveMenu("질문")}
                        >
                            질문
                        </MenuButton>
                        <MenuButton
                            active={activeMenu === "답변"}
                            onClick={() => setActiveMenu("답변")}
                        >
                            답변
                        </MenuButton>
                    </Menu>
                    {activeMenu === "질문" ? (
                        <QuestionSection />
                    ) : (
                        <AnswerSection />
                    )}
                </QNAContainer>
            </Wrapper>
        </>
    );
}

export default Profile;

const QNAContainer = styled.div``;

const Menu = styled.div`
    display: flex;
    justify-content: start;
    margin-bottom: 57px;
    gap: 16px;
`;

const MenuButton = styled.button`
    background-color: transparent;
    border: none;
    padding: 0 10px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    border-bottom: 2px solid transparent;

    ${(props) =>
        props.active && "color: #285fff; border-bottom: 2px solid #285fff;"}
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 120px;
`;

const ProfileImage = styled.div`
    background-color: ${(props) => getBackgroundColor(props.id)};
    border-radius: 50%;
    width: 129px;
    height: 129px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80px;
`;

const UserName = styled.h2`
    font-size: 24px;
    color: #333;
`;

const UserBio = styled.p`
    font-size: 20px;
    color: #666;
`;

const UserProfile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 84px;
`;
