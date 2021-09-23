/* eslint-disable no-magic-numbers */
import { transparentize } from 'polished';
import styled from 'styled-components';

const ModalS = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.modal.modalBackground};
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-flow: row wrap;
  height: 280px;
  justify-content: space-around;
  margin: auto;
  min-width: 250px;
  padding: 32px 16px 24px;
  position: relative;
  text-align: center;
  width: 25%;
  z-index: 10;

  div {
    display: flex;
    width: 90%;
    justify-content: space-around;

    button {
      background-color: ${({ theme }) => transparentize(0.1, theme.colors.text)};
      border: 0;
      border-radius: 3px;
      color: ${({ theme }) => theme.modal.modalBackground};
      font-display: fallback;
      font-size: 24px;
      height: 40px;
      margin-right: 8px;
      margin: 18px;
      width: 100%;
    }
  }

  @media(max-width: 460px) {
    width: 75%;
    height: 75%;
  }
`;

export default ModalS;
