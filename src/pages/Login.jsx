import styled from "styled-components";
import InputFields from "../components/InputFields";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { login } from "../apis/user";

function Login() {
  const navigate = useNavigate();
  const { setLogin, isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 상태 체크 및 리다이렉트
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // 로그인 처리 함수
  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("로그인 성공");
      setLogin();
    } catch (error) {
      alert("로그인 실패");
    }
  };

  return (
    <Wrapper>
      <LoginContainer>
        <Logo src="/logo.svg" alt="logo" />
        <LoginTitle>Welcome Back</LoginTitle>
        <LoginSubtitle>Please enter your details to sign in</LoginSubtitle>

        <InputFields
          label="이메일"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputFields
          label="비밀번호"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <ButtonGroup>
          <Button onClick={handleLogin} variant="login">
            로그인
          </Button>
          <Button onClick={() => navigate("/signup")} variant="signup">
            회원가입
          </Button>
        </ButtonGroup>
      </LoginContainer>
      <BackgroundCircle1 />
      <BackgroundCircle2 />
      <BackgroundCircle3 />
      <BackgroundCircle4 />
    </Wrapper>
  );
}

export default Login;

// 스타일 컴포넌트 정의
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8fafc;
  font-family: "Poppins", sans-serif;
  position: relative;
  overflow: hidden;
`;

// 메인 로그인 컨테이너
const LoginContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 80px 80px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  position: relative;
  z-index: 1;
`;

// 로고 스타일링
const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 32px;
`;

// 로그인 타이틀 스타일링
const LoginTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
  margin-top: 16px;
`;

// 로그인 서브타이틀
const LoginSubtitle = styled.p`
  font-size: 16px;
  color: #64748b;
  margin-bottom: 32px;
`;

// 버튼 그룹 컨테이너
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 32px;
`;

// 배경 장식용 원 1 (분홍색)
const BackgroundCircle1 = styled.div`
  position: fixed;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff69b433, #ff149433);
  top: -200px;
  right: -100px;
  z-index: 0;
`;

// 배경 장식용 원 2 (하늘색)
const BackgroundCircle2 = styled.div`
  position: fixed;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: linear-gradient(135deg, #87ceeb33, #00bfff33);
  bottom: -150px;
  left: -50px;
  z-index: 0;
`;

// 배경 장식용 원 3 (연한 보라)
const BackgroundCircle3 = styled.div`
  position: fixed;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e6e6fa44, #dda0dd44);
  top: 40%;
  right: 15%;
  z-index: 0;
`;

// 배경 장식용 원 4 (연한 살구색)
const BackgroundCircle4 = styled.div`
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffdab944, #ffe4b544);
  top: 15%;
  left: 15%;
  z-index: 0;
`;
