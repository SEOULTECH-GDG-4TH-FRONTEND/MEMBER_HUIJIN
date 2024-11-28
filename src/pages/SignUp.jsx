// 필요한 라이브러리와 컴포넌트 import
import styled from "styled-components";
import InputFields from "../components/InputFields";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { signup } from "../apis/user";

function SignUp() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  // 로그인 상태 체크 및 리다이렉트
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // 회원가입 처리 함수
  const handleSignup = async () => {
    try {
      await signup(username, password1, password2, email);
      alert("회원가입 성공");
      navigate("/login");
    } catch (error) {
      alert("회원가입 실패");
    }
  };

  return (
    <Wrapper>
      <LoginContainer>
        <LoginTitle>Create Account</LoginTitle>
        <LoginSubtitle>Join our community today!</LoginSubtitle>

        <InputFields
          label="이메일"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputFields
          label="비밀번호"
          type="password"
          onChange={(e) => {
            setPassword1(e.target.value);
          }}
        />
        <InputFields
          label="비밀번호 확인"
          type="password"
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
        />
        <InputFields
          label="닉네임"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <ButtonGroup>
          <Button
            onClick={() => {
              handleSignup();
            }}
            variant="signup"
          >
            회원가입
          </Button>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            variant="back"
          >
            돌아가기
          </Button>
        </ButtonGroup>
      </LoginContainer>
      <BackgroundCircle1 />
      <BackgroundCircle2 />
      <BackgroundCircle3 />
      <BackgroundCircle4 />
      <BackgroundCircle5 />
      <BackgroundCircle6 />
    </Wrapper>
  );
}

export default SignUp;

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

// 메인 회원가입 컨테이너
const LoginContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 60px 80px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  position: relative;
  z-index: 1;
`;

// 로고 스타일링
const Logo = styled.img`
  position: absolute;
  top: 30px;
  left: 40px;
  width: 120px;
  height: auto;
  z-index: 2;
`;

// 회원가입 타이틀 스타일링
const LoginTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
`;

// 회원가입 서브타이틀
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

// 배경 장식용 원 1 (연두색)
const BackgroundCircle1 = styled.div`
  position: fixed;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  background: linear-gradient(135deg, #98fb9844, #90ee9044);
  top: -100px;
  left: -150px;
  z-index: 0;
`;

// 배경 장식용 원 2 (연분홍)
const BackgroundCircle2 = styled.div`
  position: fixed;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffb6c144, #ffc0cb44);
  top: 20%;
  right: -100px;
  z-index: 0;
`;

// 배경 장식용 원 3 (연노랑)
const BackgroundCircle3 = styled.div`
  position: fixed;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffffe044, #fffacd44);
  bottom: -100px;
  right: 20%;
  z-index: 0;
`;

// 배경 장식용 원 4 (연하늘)
const BackgroundCircle4 = styled.div`
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e0ffff44, #b0e0e644);
  top: 10%;
  left: 25%;
  z-index: 0;
`;

// 배경 장식용 원 5 (연보라)
const BackgroundCircle5 = styled.div`
  position: fixed;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e6e6fa44, #d8bfd844);
  bottom: 15%;
  left: 10%;
  z-index: 0;
`;

// 배경 장식용 원 6 (연살구)
const BackgroundCircle6 = styled.div`
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffdab944, #ffe4b544);
  top: 30%;
  right: 30%;
  z-index: 0;
`;
