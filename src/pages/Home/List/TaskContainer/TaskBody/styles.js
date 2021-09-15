import styled from 'styled-components';

export const TaskBodyS = styled.section`
  display: flex;
  justify-content: space-between;
  height: 100%;
  padding-right: 4px;
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
  justify-content: space-between;
  min-width: 60px;
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

  :hover {
    color: ${({ theme, clear }) => (clear ? 'red' : theme.colors.primary)};
  }

  @media(max-width: 560px) {
    font-size: 16px;
  }
`;
