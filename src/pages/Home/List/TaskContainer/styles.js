import styled from 'styled-components';

const ItemS = styled.li`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  display: flex;
  min-height: 70px;
  overflow-x: hidden;
  padding-left: 4px;
  width: 100%;

  ::-webkit-scrollbar {
    display: none;
  }

  .form-floating > .form-control {
    height: 43px;
  }
  
  .form-floating > label {
    padding: 22px 16px;
    font-family: ubuntu;
    font-display: fallback;
  }
`;

export default ItemS;
