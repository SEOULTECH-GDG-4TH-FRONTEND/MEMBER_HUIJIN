import "./App.css";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import ProfileCard from "./components/ProfileCard";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllUsers } from "./apis/user";

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

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-top: 30px;
`;

function App() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllUsers();
        setProfiles(data);
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
        {/* <Title>🙋🏻 누구에게 질문할까요? ✨</Title> */}
        {/* <Title> 누구에게 질문할까요❓ ✨질문✨하고 싶은 분을 골라주세요!</Title> */}

        <Title>🙋🏻 누구에게 질문할까요?</Title>

        <CardWrapper>
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              id={profile.id}
              name={profile.username}
              bio={profile.bio}
              questionCount={profile.receivedQuestionCount}
              onClick={() =>
                navigate("/question", {
                  state: { user: profile },
                })
              }
            />
          ))}
        </CardWrapper>
      </Wrapper>
    </>
  );
}

export default App;
