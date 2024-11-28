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
  font-family: "Poor Story", "Poppins", sans-serif;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-top: 30px;
`;

function App() {
  const { isLoggedIn, setLogout } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  // 로그인 상태 체크
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // 페이지 종료 시 로그아웃
  useEffect(() => {
    const handleTabClose = () => {
      if (isLoggedIn) {
        setLogout();
      }
    };

    window.addEventListener("beforeunload", handleTabClose);

    // visibilitychange 이벤트도 추가
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setLogout();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isLoggedIn, setLogout]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllUsers();
        setProfiles(data);
      } catch (error) {
        console.error(error);
        // 에러 발생 시 로그아웃하고 로그인 페이지로 이동
        setLogout();
        navigate("/login");
      }
    }

    fetchData();
  }, [navigate, setLogout]);

  return (
    <>
      <Navbar />
      <Wrapper>
        <Title> 누구에게 질문할까요? ✉️</Title>
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
