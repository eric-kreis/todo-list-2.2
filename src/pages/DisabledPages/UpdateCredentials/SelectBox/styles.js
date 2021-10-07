import styled from 'styled-components';

const SelectBoxS = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;

  button {
    background-color: transparent;
    border: 0;
    border-radius: 3px;
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    color: ${({ theme }) => theme.colors.input};
    height: 45px;
    width: 100%;
    margin-right: 8px;

    :last-of-type {
      margin-right: 0;
      margin-left: 8px;
    }
  }
`;

export default SelectBoxS;
