import styled from "styled-components";

const StyledButton = styled.button`
  width: 200px;
  height: 55px;
  border-radius: 20px; /* 버튼의 둥근 모서리 */
  border: none; /* 테두리 없음 */
  font-size: large; /* 폰트 크기 */
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center; /* 세로 중앙 정렬 */
  margin-top: 20px; /* 버튼과 위 요소 간의 여백 */
  cursor: pointer; /* 커서 모양 변경 */
  transition: background-color 0.2s;

  // 로그인 버튼 스타일
  ${(props) =>
    props.variant === "login" &&
    `
    background-color: #f797b0;
    color: white;
    &:hover {
      background-color: #e57a94;
    }
  `}

  // 회원가입 버튼 스타일
  ${(props) =>
    props.variant === "signup" &&
    `
    background-color: #6b9fff;
    color: white;
    &:hover {
      background-color: #4a7ed9;
    }
  `}
`;

// 태그 사이에 쓰는 내용을 children으로 받아올 수 있습니다.
function Button({ children, onClick, variant }) {
  return (
    <StyledButton onClick={onClick} variant={variant}>
      {children}
    </StyledButton>
  );
}

export default Button;