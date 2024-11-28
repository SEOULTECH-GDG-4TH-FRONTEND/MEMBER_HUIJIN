import styled from "styled-components";
import { useState } from "react";

// 입력 필드를 감싸는 최상위 컨테이너
const InputContainer = styled.div`
  margin-bottom: 34px;
  position: relative;
`;

// 입력 필드의 레이블 스타일링
const Label = styled.span`
  display: block;
  color: #a0a0a0;
  margin-bottom: 11px;
  font-size: 14px;
`;

// 입력 필드 래퍼
const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

// 실제 입력 필드 스타일링
const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #a0a0a0;
  border-radius: 12px;
  width: 100%;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }

  &::placeholder {
    color: #c0c0c0;
  }
`;

// 비밀번호 토글 버튼 스타일링
const ToggleButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #a0a0a0;
  font-size: 12px;
  padding: 5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    color: #808080;
  }
`;

function InputFields({ label, type = "text", onChange }) {
  // 비밀번호 표시 여부 상태 관리
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  // 비밀번호 토글 핸들러
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputWrapper>
        <Input
          type={isPassword && showPassword ? "text" : type}
          placeholder={label}
          onChange={onChange}
        />
        {isPassword && (
          <ToggleButton
            onClick={togglePasswordVisibility}
            aria-label="비밀번호 보기"
          >
            {showPassword ? "hide" : "show"}
          </ToggleButton>
        )}
      </InputWrapper>
    </InputContainer>
  );
}

export default InputFields;
