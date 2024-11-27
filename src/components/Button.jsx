import styled from "styled-components";

const StyledButton = styled.button`
  width: 200px;
  height: 55px;
  border-radius: 20px; /* 버튼의 둥근 모서리 */
  border: none; /* 테두리 없음 */
  font-size: large; /* 폰트 크기 */
  background-color: rgba(247, 122, 122, 0.7); /* 투명도 적용 */
  color: aliceblue; /* 텍스트 색상 */
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center; /* 세로 중앙 정렬 */
  margin-top: 20px; /* 버튼과 위 요소 간의 여백 */
  cursor: pointer; /* 커서 모양 변경 */

  &:hover {
    background-color: rgb(247, 122, 122); /* hover 상태에서의 배경색 */
  }
`;

// 태그 사이에 쓰는 내용을 children으로 받아올 수 있습니다.
function Button({ children, onClick }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default Button;
