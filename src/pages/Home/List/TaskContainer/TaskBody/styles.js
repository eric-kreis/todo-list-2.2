import styled from 'styled-components';

export const TaskBodyS = styled.section`
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  :hover {
    div {
      transition: .50s opacity ease-out;
      opacity: 1;
    }
  }

  @media(max-width: 768px) {
    div {
      opacity: 1;
    }
  }
`;

export const TaskButtonS = styled.div`
  align-items: center;
  display: flex;
  min-width: 100px;
  justify-content: space-between;
  width: 15%;
  opacity: 0;

  @media(max-width: 768px) {
    font-size: 15px;
  }

  @media(max-width: 560px) {
    justify-content: space-evenly;
  }
`;

export const TaskIconS = styled.button`
  background-color: transparent;
  border: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  padding: 2px;
  margin-right: 24px;

  :hover {
    color: ${({ theme, clear }) => (clear ? 'red' : theme.colors.primary)};
  }

  @media(max-width: 560px) {
    font-size: 16px;
  }
`;
