/* eslint-disable no-magic-numbers */
import styled from 'styled-components';

const ProfileBodyS = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  min-height: calc(var(--vh, 1vh) * 100);
`;

export const ProfileMainS = styled.main`
  background-color: whitesmoke;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  color: ${({ theme }) => theme.colors.input};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 85vh;
  margin: auto;
  overflow: scroll;
  padding: 36px 16px 16px;
  text-align: center;
  width: 35%;

  ::-webkit-scrollbar {
    display: none;
  }

  button {
    font-size: 18px;
  }

  @media(max-width: 1024px) {
    width: 45%;
  }

  @media(max-width: 768px) {
    width: 55%;
  }

  @media(max-width: 640px) {
    border-radius: 0;
    box-shadow: none;
    min-height: calc(var(--vh, 1vh) * 100);
    width: 100%;
  }
`;

export const LogoutContainerS = styled.section`
  display: flex;
  justify-content: right;
  margin-top: 16px;
  width: 100%;

  button {
    background-color: transparent;
    border: 0;
    border-radius: 3px;
    color: ${({ theme }) => theme.colors.input};
    font-size: 22px;
    padding: 1px 0;
    width: 30px;

    :hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default ProfileBodyS;
