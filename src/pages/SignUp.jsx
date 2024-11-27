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

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

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
            <LeftWrap>
                <Logo src="/logo.svg" alt="" />
                Welcome <br />
                Back!
            </LeftWrap>
            <RightWrap>
                <LoginContainer>
                    <Text>Login</Text>
                    <InputFields
                        label="이메일"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <InputFields
                        label="비밀번호"
                        onChange={(e) => {
                            setPassword1(e.target.value);
                        }}
                    />
                    <InputFields
                        label="비밀번호 확인"
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
                    <Button
                        onClick={() => {
                            handleSignup();
                        }}
                    >
                        회원가입
                    </Button>
                    <Button
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        돌아가기
                    </Button>
                </LoginContainer>
            </RightWrap>
        </Wrapper>
    );
}

export default SignUp;

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
`;

const LeftWrap = styled.div`
    flex: 1;
    background: linear-gradient(to bottom, #0644e1, #6285dd);
    display: flex;
    align-items: center;
    padding-left: 65px;
    color: white;
    font-size: 64px;
    font-weight: 900;
    line-height: 1.2;
    position: relative;
`;

const RightWrap = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 65px;
    width: 100%;
`;

const Logo = styled.img`
    position: absolute;
    top: 47px;
`;

const LoginContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    flex-direction: column;
    box-sizing: border-box;
`;

const Text = styled.h1`
    font-size: 48px;
    margin-bottom: 44px;
`;
